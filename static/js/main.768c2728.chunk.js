(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(t,e,n){t.exports=n(34)},34:function(t,e,n){"use strict";n.r(e);var a,o=n(0),c=n.n(o),i=n(18),r=n.n(i),s=(n(8),n(11)),u=n(9),l={location:"Los Angeles, California, United States",locationLngLat:[-118.2439,34.0544],tweets:[]},p=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"LOCATION_SET_CITY_COORDINATES":return{location:e.location,locationLngLat:e.locationLngLat,tweets:t.tweets};case"LOCATION_SET_CITY":return{location:e.city,locationLngLat:t.locationLngLat,tweets:t.tweets};case"SET_TWEETS":return{location:t.location,locationLngLat:t.locationLngLat,tweets:e.tweetsArray};default:return t}},h=n(2),d=n(3),m=n(6),f=n(4),b=n(5),v=n(7),y="pk.eyJ1Ijoia3V0dXphdmNoYW5pbiIsImEiOiJjam5kYnphbW8wczQ1M3ZucmxxMGpoZzFkIn0.Mc_1RL2WSX97wJ7hU3DENA",L=function(t){function e(){return Object(h.a)(this,e),Object(m.a)(this,Object(f.a)(e).apply(this,arguments))}return Object(b.a)(e,t),Object(d.a)(e,[{key:"render",value:function(){return c.a.createElement("form",{onSubmit:this.props.handleLocationSubmit,className:"location-input"},c.a.createElement("label",null,c.a.createElement("input",{type:"text",name:"location",placeholder:"Enter a city",value:this.props.locationToShow,onChange:this.props.handleLocationChange})),c.a.createElement("button",{type:"submit"},"Find tweets"))}}]),e}(c.a.Component),g=n(10),w=n.n(g),O=(n(16),[]),E=function(t){function e(){return Object(h.a)(this,e),Object(m.a)(this,Object(f.a)(e).apply(this,arguments))}return Object(b.a)(e,t),Object(d.a)(e,[{key:"componentWillReceiveProps",value:function(t){if(t.state.locationLngLat!==this.props.state.locationLngLat&&a.setCenter(t.state.locationLngLat),t.state.tweets&&t.state.tweets!==this.props.state.tweets){for(var e=0;e<O.length;e++){O[e].remove()}this.createPins(t.tweets)}}},{key:"createPins",value:function(t){O=t.map(function(t,e){var n=document.createElement("div");n.className="marker";var o=new w.a.Popup({offset:20,closeButton:!1,className:"popup"}),c=t.pic?t.pic:"",i='<img class="popup-pic" src="'.concat(c,'"></img><p class="popup-text">').concat(t.text,'</p><h5 class="popup-author">@').concat(t.user,"</h6>");return o.setHTML(i),n.addEventListener("mouseover",function(){return o.setLngLat(t.point).setHTML(i).addTo(a)}),n.addEventListener("mouseout",function(){return o.remove()}),new w.a.Marker(n).setLngLat(t.point).setPopup(o).addTo(a)})}},{key:"generateRandomColor",value:function(){return"rgb(".concat(255*Math.random(),", ").concat(255*Math.random(),", ").concat(255*Math.random(),")")}},{key:"renderMapToScreen",value:function(){w.a.accessToken=y,a=new w.a.Map({container:document.getElementById("mapbox-container"),style:"mapbox://styles/mapbox/dark-v9",center:["-118.2439","34.0544"],zoom:12,hash:!1,minZoom:11,maxZoom:15,interactive:!0})}},{key:"componentDidMount",value:function(){this.renderMapToScreen()}},{key:"render",value:function(){return c.a.createElement("div",null)}}]),e}(c.a.Component),j=Object(u.b)(function(t){return{state:t}})(E),C=function(t){function e(){return Object(h.a)(this,e),Object(m.a)(this,Object(f.a)(e).apply(this,arguments))}return Object(b.a)(e,t),Object(d.a)(e,[{key:"render",value:function(){return c.a.createElement("div",{id:"mapbox-container"},c.a.createElement(j,{coordinates:this.props.coordinates,tweets:this.props.tweets}))}}]),e}(c.a.Component),T=function(t){function e(){return Object(h.a)(this,e),Object(m.a)(this,Object(f.a)(e).apply(this,arguments))}return Object(b.a)(e,t),Object(d.a)(e,[{key:"render",value:function(){return c.a.createElement("div",{className:"info-icon",onClick:this.props.handleInfoButtonClick},c.a.createElement("h1",null,"?"))}}]),e}(c.a.Component),k=function(){return c.a.createElement("div",{className:"info-tab"},c.a.createElement("h2",null,"City Tweets"),c.a.createElement("p",null,"Simply put a city and explore most recent and popular local tweets!"),c.a.createElement("p",{className:"made-by"},c.a.createElement("a",{href:"http://www.polevoy.in"},"www.polevoy.in")))},S="LOCATION_SET_CITY_COORDINATES",I="LOCATION_SET_CITY",M="SET_TWEETS";function x(t,e){return{type:S,location:t,locationLngLat:e}}n(32).config();var _=function(t){function e(t){var n;return Object(h.a)(this,e),(n=Object(m.a)(this,Object(f.a)(e).call(this,t))).getCoordinatesFromURL=function(){return window.location.hash.split("/").splice(1,2).map(function(t){return parseFloat(t)})},n.handleLocationSubmit=n.handleLocationSubmit.bind(Object(v.a)(Object(v.a)(n))),n.handleLocationChange=n.handleLocationChange.bind(Object(v.a)(Object(v.a)(n))),n.searchForTweets=n.searchForTweets.bind(Object(v.a)(Object(v.a)(n))),n}return Object(b.a)(e,t),Object(d.a)(e,[{key:"componentDidMount",value:function(){this.props.dispatch(x("Los Angeles, California, United States",[-118.2439,34.0544])),this.searchForTweets()}},{key:"requestLocationGeocode",value:function(){var t=this,e="https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(this.props.state.location,".json?access_token=").concat(y);fetch(e).then(function(t){return t.json()}).then(function(e){t.props.dispatch(x(e.features[0].place_name,e.features[0].center))})}},{key:"handleLocationSubmit",value:function(t){var e=this;t.preventDefault(),this.requestLocationGeocode(this.props.state.location),setTimeout(function(){e.searchForTweets()},3e3)}},{key:"handleLocationChange",value:function(t){var e;this.props.dispatch((e=t.target.value,{type:I,city:e}))}},{key:"generateCoordinateWithin",value:function(t,e){var n=t[0],a=t[1],o=1.60934*e*1e3/111300,c=Math.random(),i=Math.random(),r=o*Math.sqrt(c),s=2*Math.PI*i,u=r*Math.cos(s);return[r*Math.sin(s)+n,u+a]}},{key:"searchForTweets",value:function(){var t=this,e="https://cityglow.herokuapp.com/tweets?lat=".concat(this.props.state.locationLngLat[1],"&lng=").concat(this.props.state.locationLngLat[0]);fetch(e).then(function(t){return t.json()}).then(function(e){return e.concat(e).map(function(e){return{point:t.generateCoordinateWithin(t.props.state.locationLngLat,7),text:e.text,pic:e.picture?e.picture[0].media_url:void 0,user:e.user}})}).then(function(e){t.props.dispatch({type:M,tweetsArray:e})}).catch(function(t){return console.error(t)})}},{key:"handleInfoButtonClick",value:function(){"40vh"!==document.querySelector("div.info-tab").style.height?(document.querySelector("div.info-tab").style.height="40vh",document.querySelector("div.info-tab").style.paddingTop="18vh",document.querySelector("div.info-tab").style.borderRadius="0em 0em 2em 2em",document.querySelector("div.info-tab").style.border="3px solid #DC965A",document.querySelector("div.info-tab").style.backgroundColor="#2F2F2F"):(document.querySelector("div.info-tab").style.height="0vh",document.querySelector("div.info-tab").style.paddingTop="0vh",document.querySelector("div.info-tab").style.border="none")}},{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement(L,{handleLocationSubmit:this.handleLocationSubmit,handleLocationChange:this.handleLocationChange}),c.a.createElement(C,{coordinates:this.props.state.locationLngLat,tweets:this.props.state.tweets}),c.a.createElement(T,{handleInfoButtonClick:this.handleInfoButtonClick}),c.a.createElement(k,null))}}]),e}(c.a.Component),N=Object(u.b)(function(t){return{state:t}})(_),q=Object(s.b)(p);r.a.render(c.a.createElement(u.a,{store:q},c.a.createElement(N,null)),document.getElementById("root"))},8:function(t,e,n){}},[[21,2,1]]]);
//# sourceMappingURL=main.768c2728.chunk.js.map