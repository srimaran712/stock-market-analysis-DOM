const ctx = document.getElementById('myChart');


const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Stock values',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive:false,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    autoSkip: false, // Show all labels on the x-axis
                },
                display:false
            },
            y: {
                beginAtZero: true
            }
        }
    },
    
});
myChart.resize()

const stockContainer=document.getElementById('stock-box')
const summaryContainer=document.getElementById('summary')
const oneMonth=document.getElementById('1m-btn')
const threeMonth=document.getElementById('3m-btn')
const threeYears=document.getElementById('3y-btn')
const fiveYears=document.getElementById('5y-btn')
let labeldata=[]
let dataValue=[]
async function chartData(chartdata){
    const graphdata = await fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata')
    const graph= await graphdata.json()
    console.log(graph)
//graph.stocksData.forEach((g)=>{
  //  const graphkey=Object.keys(g)
  //  if(graphkey!=="_id"){
     //   graphkey.filter((gvalue)=>gvalue===chartdata);
     //   dataValue.push(graphkey)
     //   console.log(dataValue)
   // }
//})
myChart.data.labels = [];
    myChart.data.datasets[0].data = [];

    graph.stocksData.forEach((g) => {
        const graphkey = Object.keys(g);
        if (graphkey.includes(chartdata)) {
            const selectedData = g[chartdata];
            const time =g[chartdata]['5y'].timeStamp
            const newTime= time.map(t=> new Date(t * 1000).toLocaleDateString())
            
            myChart.data.labels = newTime// Set new labels
            myChart.data.datasets[0].data = g[chartdata]["5y"].value ; // Set new data
            
            // Debug: Check what data is being set
            console.log('Selected Data:', selectedData);
        }

        

    myChart.update(); // U
})
function updateDatachart(timevalue,chartValue){
    myChart.data.labels=timevalue.map(t=> new Date(t* 1000).toLocaleDateString())
    myChart.data.datasets[0].data=chartValue
    myChart.update()
}
oneMonth.addEventListener("click",async function(){
    const oneMonthgraph= await fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata')
    const oneMonthdata= await oneMonthgraph.json()
    console.log(oneMonthdata)
    myChart.data.labels = [];
    myChart.data.datasets[0].data = [];
    oneMonthdata.stocksData.forEach((one)=>{
        const oneKey=Object.keys(one)
        if(oneKey.includes(chartdata)){
            const selectedoneMonth=one[chartdata]['1mo'].value
            const oneMonthtime= one[chartdata]['1mo'].timeStamp
            updateDatachart(oneMonthtime,selectedoneMonth)
        }
    })
})
threeMonth.addEventListener('click',async function(){
    const threeMonthgraph= await fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata')
    const threeMonthdata= await threeMonthgraph.json()
    console.log(threeMonthdata)
    myChart.data.labels = [];
    myChart.data.datasets[0].data = [];

    threeMonthdata.stocksData.forEach((three)=>{
        const threeKey=Object.keys(three)
        if(threeKey.includes(chartdata)){
            const selectedthreeMonth=three[chartdata]['3mo'].value
            const threeMonthtime= three[chartdata]['3mo'].timeStamp
            updateDatachart(threeMonthtime,selectedthreeMonth)
        }
    })
})

threeYears.addEventListener('click',async function(){
    const threeYeargraph= await fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata')
    const threeYeardata= await threeYeargraph.json()
    console.log(threeYeardata)
    myChart.data.labels = [];
    myChart.data.datasets[0].data = [];

    threeYeardata.stocksData.forEach((threey)=>{
        const threeyKey=Object.keys(threey)
        if(threeyKey.includes(chartdata)){
            const selectedthreeYear=threey[chartdata]['1y'].value
            const threeYeartime= threey[chartdata]['1y'].timeStamp
            updateDatachart(threeYeartime,selectedthreeYear)
        }
    })
})

fiveYears.addEventListener('click',async function(){
    const fiveYeargraph= await fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata')
    const fiveYeardata= await fiveYeargraph.json()
    console.log(fiveYeardata)
    myChart.data.labels = [];
    myChart.data.datasets[0].data = [];

    fiveYeardata.stocksData.forEach((fivey)=>{
        const fiveyKey=Object.keys(fivey)
        if(fiveyKey.includes(chartdata)){
            const selectedfiveYear=fivey[chartdata]['5y'].value
            const fiveYeartime= fivey[chartdata]['5y'].timeStamp
            updateDatachart(fiveYeartime,selectedfiveYear)
        }
    })
})
}

async function Summary(summarydata){
    const summaryResponse= await fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata')
    const sumcontent=await summaryResponse.json()
    console.log(sumcontent)
    summaryContainer.innerHTML=""
    sumcontent.stocksProfileData.forEach((sum)=>
    {
        const sumkey=Object.keys(sum)
        if (sumkey.includes(summarydata)) {
            console.log(sum[summarydata])
            summaryContainer.innerHTML=sum[summarydata].summary
            summaryContainer.style.fontFamily="Inter";
            summaryContainer.style.fontSize="14px";
            summaryContainer.style.letterSpacing="1px"

        }
    })
}

async function stockList(){
       
    const response= await fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata')
    const stockData= await response.json()
   
   
     stockContainer.innerHTML=''
    stockData.stocksStatsData.forEach((stock)=>{
       
       const keys=Object.keys(stock)

       keys.forEach((key)=>{
        if(key!=='_id'){
            const listItems=document.createElement('li')
            listItems.style.display='flex'
            listItems.style.gap='25px'
            listItems.style.width="350px"
             listItems.style.margin="10px"
            const buttons=document.createElement('button')
            
            const bookvalue=document.createElement('h4')
            bookvalue.textContent=`$ ${stock[key].bookValue}`
            bookvalue.style.fontFamily="Poppins"
            bookvalue.style.fontSize="15px"
            const profit=document.createElement('h4')
            profit.textContent=`${stock[key].profit} %`
            if(stock[key].profit<=0){
                  profit.style.color="red"
                  profit.style.fontFamily="Inter"
                  profit.style.fontWeight="400"
            }
            else{
                profit.style.color="green";
                  profit.style.fontFamily="Inter"
                  profit.style.fontWeight="400"
            }
            buttons.className="stock-btn"
            buttons.style.width="100px"
            buttons.style.backgroundColor="rgb(10, 53, 243)";
            buttons.style.border="none";
            buttons.style.color="#fff"
            buttons.textContent=key;
            listItems.appendChild(buttons)
            listItems.appendChild(bookvalue)
            listItems.appendChild(profit)
            stockContainer.appendChild(listItems)
            buttons.addEventListener("click",function(e){
                e.preventDefault()
                const existingValue= e.target.textContent
                console.log(existingValue)
                chartData(existingValue)
                Summary(existingValue)
            })
        }
       
       })
    })
}
stockList()
