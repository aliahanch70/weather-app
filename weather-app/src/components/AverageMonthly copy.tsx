import { LineChart } from '@mui/x-charts/LineChart';
import { Typography, Box } from '@mui/material';

// داده‌های نمونه برای دمای ۱۲ ماه سال
const monthlyTemperatures = [16, 27, 21, 19, 27, 22, 35, 32, 39, 25, 31, 32];
// ماه ها
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function MonthlyTempChart() {
  return (
    <>
      <Typography  sx={{fontSize:18, fontWeight: 'bold', my: 1 ,ml:2, textAlign: 'left', color:theme => theme.palette.color1?.default  }}>
        Average Monthly Temprature
      </Typography>
      
      <Box sx={{ width: '100%' }}>
        <LineChart
          // ارتفاع چارت  
          height={180} 
          
          xAxis={[{ 

            disableLine: true,
            disableTicks: true,
            
            scaleType: 'point', 
            data: months,       
          }]}
          
          // داده اصلی
          series={[
            {
              data: monthlyTemperatures,
              area: true, 
              color: 'url(#lineGradient)',
            },
          ]}

          yAxis={[{
            disableLine: true,
            disableTicks: true,
            // استایل دلخواه برای اعداد محور
            tickLabelStyle: {
              fontSize: 14,
            },
            // اضافه کردن علامت '°C' به انتهای هر عدد
            valueFormatter: (value:any) => `${value}°C`,
          }]}
          
          // خط راهنما
          grid={{ vertical: false, horizontal: true }}
          
        >
        <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#eb5656ff" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#5796dfff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          </LineChart>
      </Box>
    </>
  );
}