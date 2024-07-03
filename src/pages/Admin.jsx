import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserManagement from '../components/AdminDashboard/UserManagement';
import TicketPricingManagement from '../components/AdminDashboard/TicketPricingManagement';

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <UserManagement />
        <TicketPricingManagement />
        {/* Add other management components here */}
      </div>
      <Footer />
    </div>
  );
};

export default Admin;






















// // src/pages/Admin.jsx
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import UserManagement from '../components/UserManagement';
// import BookingManagement from '../components/BookingManagement';
// import TrainScheduleManagement from '../components/TrainScheduleManagement';
// import StationManagement from '../components/StationManagement';
// import TicketPricingManagement from '../components/TicketPricingManagement';
// import FeedbackSupport from '../components/FeedbackSupport';
// import ReportingAnalytics from '../components/ReportingAnalytics';
// import NotificationsAnnouncements from '../components/NotificationsAnnouncements';
// import SecurityCompliance from '../components/SecurityCompliance';
// import ContentManagement from '../components/ContentManagement';

// const Admin = () => {
//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col">
//         <header className="bg-blue-800 text-white p-4">
//           <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         </header>
//         <div className="flex flex-1">
//           <aside className="w-64 bg-gray-800 text-white p-4">
//             <nav>
//               <ul>
//                 <li><Link to="/admin/users">User Management</Link></li>
//                 <li><Link to="/admin/bookings">Booking Management</Link></li>
//                 <li><Link to="/admin/trains">Train Schedule Management</Link></li>
//                 <li><Link to="/admin/stations">Station Management</Link></li>
//                 <li><Link to="/admin/pricing">Ticket Pricing Management</Link></li>
//                 <li><Link to="/admin/feedback">Feedback and Support</Link></li>
//                 <li><Link to="/admin/reports">Reporting and Analytics</Link></li>
//                 <li><Link to="/admin/notifications">Notifications and Announcements</Link></li>
//                 <li><Link to="/admin/security">Security and Compliance</Link></li>
//                 <li><Link to="/admin/content">Content Management</Link></li>
//               </ul>
//             </nav>
//           </aside>
//           <main className="flex-1 p-6">
//             <Switch>
//               <Route path="/admin/users" component={UserManagement} />  
//               <Route path="/admin/bookings" component={BookingManagement} />
//               <Route path="/admin/trains" component={TrainScheduleManagement} />
//               <Route path="/admin/stations" component={StationManagement} />
//               <Route path="/admin/pricing" component={TicketPricingManagement} />
//               <Route path="/admin/feedback" component={FeedbackSupport} />
//               <Route path="/admin/reports" component={ReportingAnalytics} />
//               <Route path="/admin/notifications" component={NotificationsAnnouncements} />
//               <Route path="/admin/security" component={SecurityCompliance} />
//               <Route path="/admin/content" component={ContentManagement} />
//               <Route path="/" render={() => <h2 className="text-xl font-bold mb-4">Welcome, Admin</h2>} />
//             </Switch>
//           </main>
//         </div>
//         <footer className="bg-gray-800 text-white p-4 text-center">
//           <p>&copy; 2024 Train Booking System. All rights reserved.</p>
//         </footer>
//       </div>
//     </Router>
//   );
// };

// export default Admin;
