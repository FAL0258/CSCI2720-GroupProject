import React from 'react';
import "./style2.css" 
  

class SearchBox extends React.Component{
    render(){
        return(
<div class="main">
  
 
  <div class="form-group has-search">
    <span class="fa fa-search form-control-feedback"></span>
    <input type="text" class="form-control" placeholder="Search"/>
  </div>
  

 </div>
        );}}

        export default React.memo(SearchBox) 