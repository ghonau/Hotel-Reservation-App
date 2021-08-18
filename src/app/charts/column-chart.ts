export const columnChartOptions : any = {
chart:{
    type:'column'
},
title:{
    text:"Monthly Revenue"
},
subtitle:{
    text:"Hotel Revenue in millions"
},
xAxis:{
    categories:[
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec']
},
plotOptions:{
    series:{
        pointPadding: 2, 
        pointWidth:25
    },
yAxis:{
    title:{text:'Revenue (millions)'}
},

},
series:[{
    name:'Revenue',
    data:[45, 24, 68, 65.8, 64, 57, 47, 98, 111, 84, 58, 23]
}]
}
