const fetchData = require('./info')


const updateInfo = async() => {
       setInterval(  ()=>{
         fetchData();
        console.log('Updating...');
     },100000)
}
module.exports = updateInfo