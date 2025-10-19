-- Check current data in database
SELECT 'Users' as table_name, COUNT(*) as count FROM "User"
UNION ALL
SELECT 'Salons' as table_name, COUNT(*) as count FROM "Salon"
UNION ALL
SELECT 'Services' as table_name, COUNT(*) as count FROM "Service"
UNION ALL
SELECT 'Bookings' as table_name, COUNT(*) as count FROM "Booking";
