import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';

import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import userApi from 'src/api/userApi';
import stylistApi from 'src/api/stylistApi';
import appointmentApi from 'src/api/appointment';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

interface AppointmentDetail {
  appointmentId: number;
  serviceName: string;
  stylistName: string;
  returnDate: string;
  price: number;
  type: string;
  status: string;
  appointmentDetailSlots: { slotId: number; slot: string }[];
}

interface Appointment {
  appointmentId: number;
  note: string | null;
  date: string;
  status: string;
  amount: number;
  userName: string;
  salonAddress: string;
  orderCode: number;
  appointmentDetails: AppointmentDetail[];
}
// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const [customerCount, setCustomerCount] = useState(0);
  const [stylistCount, setStylistCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [income, setIncome] = useState(0);
  const [incomeData, setIncomeData] = useState({
    categories: [] as string[], // Months
    series: [] as { name: string; data: number[] }[], // Income data for the months
  });

  useEffect(() => {
    const fetchCustomerCount = async () => {
      const response = await userApi.getCustomers();
      const customers = response.data; // Assuming response.data is an array
      setCustomerCount(customers.length); // Count the number of customers
      console.log(`customerCount: ${customers.length}`);
    };
    const fetchStylistCount = async () => {
      const response = await userApi.getStylists();
      const stylists = response.data; // Assuming response.data is an array
      setStylistCount(stylists.length); // Count the number of stylists
      console.log(`StylistCount: ${stylists.length}`);
    };
    const fetchAppointmentsCount = async () => {
      const response = await appointmentApi.getAppointment('Paid', 'Completed');
      const appointments = response.data; // Assuming response.data is an array
      setAppointmentsCount(appointments.length); // Count the number of appointments
      console.log(`AppointmentsCount: ${appointments.length}`);
    };

    const fetchIncome = async () => {
      const response = await appointmentApi.getAppointment('Paid', 'Completed');
      const appointments: Appointment[] = response.data; // Explicitly type the response as an array of Appointment objects

      // Sum the prices from the appointmentDetails array
      let totalIncome = 0;
      appointments.forEach((appointment: Appointment) => {
        appointment.appointmentDetails.forEach((detail: AppointmentDetail) => {
          totalIncome += detail.price; // Sum up the price of each appointment detail
        });
      });

      setIncome(totalIncome); // Set the total income
      console.log(`Income: ${totalIncome}`);
    };

    const fetchIncomeData = async () => {
      const response = await appointmentApi.getAppointment('Paid', 'Completed');

      // Define all months of the year
      const allMonths: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      // Initialize income data for each month with 0
      const monthlyIncome: { [month: string]: number } = {};
      allMonths.forEach((month) => {
        monthlyIncome[month] = 0; // Initialize each month with income = 0
      });

      // Extract the date and price data from the response
      response.data.forEach((appointment: Appointment) => {
        appointment.appointmentDetails.forEach((detail) => {
          const month = new Date(detail.returnDate).toLocaleString('default', { month: 'long' }); // Get month name
          const price = detail.price;

          // Accumulate the income for the corresponding month
          monthlyIncome[month] += price;
        });
      });

      // Now that we have the total income by month, format the categories and series for the chart
      setIncomeData({
        categories: allMonths, // Use all months for the categories
        series: [
          {
            name: 'Income',
            data: allMonths.map((month) => monthlyIncome[month]), // Map the total income for each month
          },
        ],
      });
    };

    fetchCustomerCount();
    fetchStylistCount();
    fetchAppointmentsCount();
    fetchIncome();
    fetchIncomeData();
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Stylists"
            percent={0} // Replace with a dynamic value if available
            total={stylistCount}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: [],
              series: [],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Customers"
            percent={0}
            total={customerCount}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: [],
              series: [],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Appointments"
            percent={0} // Replace with a dynamic value if available
            total={appointmentsCount}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: [],
              series: [],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Income"
            percent={0} // Replace with a dynamic value if available
            total={income}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: [],
              series: [],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={12}>
          <AnalyticsWebsiteVisits
            title="Monthly Income"
            subheader="Income report for the selected months"
            chart={{
              categories: incomeData.categories, // All months displayed as categories
              series: incomeData.series, // Income data for each month
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
