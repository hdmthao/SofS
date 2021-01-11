import moment from 'moment';
import { ForbiddenError, NotFoundError } from '../utils/errors/userFacingError';
import {
  ShippingAddress,
  Order,
  OrderDetail,
  User,
  Product,
  sequelize,
} from '../models';
import { DatabaseError } from '../utils/errors/baseError';

export default class OrderService {
  static async getOrder(orderId, buyer) {
    const order = await Order.findOne({
      where: {
        id: orderId,
        status: true
      },
      include: [{
        model: ShippingAddress,
        as: 'shippingAddress'
      }, {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }, {
        model: OrderDetail,
        as: 'orderItems',
        attributes: [
          'id', 'quantity'
        ],
        include: [{
          model: Product,
          as: 'product',
          attributes: ['name', 'price', 'image']
        }]
      }]
    });

    if (!order) {
      throw new NotFoundError('Order Not Found', 'not_found');
    }

    if ((order.buyerId !== buyer.id && !['admin', 'seller'].includes(buyer.userType)) || (buyer.userType === 'seller' && buyer.id !== order.sellerId)) {
      throw new ForbiddenError('You Cannot Access This Resource', 'forbidden_error');
    }
    return {
      order
    };
  }

  static async createOrder(buyerId, data) {
    const t = await sequelize.transaction();
    try {
      const shippingAddress = await ShippingAddress.create(data.shippingAddress, {
        transaction: t
      });

      if (!shippingAddress) {
        throw DatabaseError('Cannot create shipping address', 'database_error');
      }

      const orderInfo = {
        sellerId: data.orderItems[0].seller.id,
        buyerId,
        shippingAddressId: shippingAddress.id,
        paymentMethod: data.paymentMethod,
        itemsPrice: data.itemsPrice,
        taxPrice: data.taxPrice,
        shippingPrice: data.shippingPrice,
        totalPrice: data.totalPrice
      };
      const order = await Order.create(orderInfo, {
        transaction: t,
        raw: true
      });
      await t.commit();
      order.dataValues.shippingAddress = shippingAddress.dataValues;

      const orderItems = data.orderItems.map(item => {
        return {
          productId: item.product,
          quantity: item.qty,
          orderId: order.id
        };
      });
      OrderDetail.bulkCreate(orderItems);
      return {
        order
      };
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  static async payOrder(orderId) {
    return await Order.update({
      isPaid: true,
      paidAt: moment.now()
    }, {
      where: {
        id: orderId
      }
    }).spread((affectedCount) => {
      if (!affectedCount) {
        throw new NotFoundError('Fail To Pay', 'not_found');
      }
      return {
        message: 'Paid'
      };
    });
  }

  static async deliverOrder(orderId) {
    return await Order.update({
      isDelivered: true,
      deliveredAt: moment.now()
    }, {
      where: {
        id: orderId
      }
    }).spread((affectedCount) => {
      if (!affectedCount) {
        throw new NotFoundError('Fail To Deliver', 'not_found');
      }
      return {
        message: 'Delivered'
      };
    });
  }
}
