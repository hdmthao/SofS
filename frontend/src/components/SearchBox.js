import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search form-control input-sm header-search-wrapper p-0 js-chromeless-input-container header-search-wrapper position-relative d-flex flex-justify-between flex-items-center mb-n1 mt-n1" onSubmit={submitHandler}>
      <input
        type="text"
        name="q"
        id="q"
        className="form-control input-sm header-search-input"
        placeholder="Search for product(s)"
        onChange={(e) => setName(e.target.value)}
      ></input>
      
        {/* <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>  */}
    </form>
  );
}
