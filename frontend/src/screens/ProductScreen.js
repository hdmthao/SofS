// /* eslint-disable react/prop-types */
// /* eslint-disable no-underscore-dangle */
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Rating from '../components/Rating';
// // import Product from '../components/Product'
// import data from '../data';

// export default function ProductScreen(props) {
//   const product = data.products.find((x) => x._id === props.match.params.id);

//   const [quantity, setQuantity] = useState(1);
//   if (!product) {
//     return <div> Product Not Found</div>;
//   }
//   const addtoCartHandler = () => {
//     props.history.push(`/cart/${product._id}?quantity={quantity}`);
//   };

//   return (
//     <div>
//       <Link to="/">Back to result</Link>
//       <div className="row top">
//         <div className="col-2">
//           <img className="large" src={product.image} alt={product.name}></img>
//         </div>
//         <div className="col-1">
//           <ul>
//             <li>
//               <h1>{product.name}</h1>
//             </li>
//             <li>
//               <Rating
//                 rating={product.rating}
//                 numReviews={product.numReviews}
//               ></Rating>
//             </li>
//             <li>Price: ${product.price}</li>
//             <li>
//               Description:
//               <p>{product.description} </p>
//             </li>
//           </ul>
//         </div>
//         <div className="col-1">
//           <div className="card card-body">
//             <ul>
//               <li>
//                 <div className="row">
//                   <div> Price </div>
//                   <div className="price"> ${product.price} </div>
//                 </div>
//               </li>
//               <li>
//                 <div className="row">
//                   <div> Status </div>
//                   <div>
//                     {" "}
//                     {product.countInStock > 0 ? (
//                       <span className="success"> In Stock </span>
//                     ) : (
//                       <span className="error"> Unavailable</span>
//                     )}{" "}
//                   </div>
//                 </div>
//               </li>
//               {product.countInStock > 0 && (
//                 <>
//                   <li>
//                     <div className="row">
//                       <div> Quantity </div>
//                       <div>
//                         <select
//                           value={quantity}
//                           onChange={(e) => setQuantity(e.target.value)}
//                         >
//                           {[...Array(product.countInStock).keys()].map((x) => (
//                             <option key={x + 1} value={x + 1}>
//                               {x + 1}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </li>
//                   <li>
//                     <button
//                       onclick={addtoCartHandler}
//                       className="primary block"
//                     >
//                       Add to Cart
//                     </button>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
