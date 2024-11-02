import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// تعريف نوع بيانات العميل
interface Customer {
  kundnummer: string;
  visits: number;
  purchases: number;
  totalAmount: number;
}

// بيانات مؤقتة للاختبار
const mockData: Customer[] = [
  { kundnummer: '001', visits: 10, purchases: 5, totalAmount: 300 },
  { kundnummer: '002', visits: 15, purchases: 3, totalAmount: 450 },
  { kundnummer: '003', visits: 8, purchases: 7, totalAmount: 250 },
  { kundnummer: '004', visits: 20, purchases: 4, totalAmount: 600 },
  { kundnummer: '005', visits: 12, purchases: 9, totalAmount: 500 },
];

export default function TopCustomersScreen() {
  const [filter, setFilter] = useState<'visits' | 'purchases' | 'totalAmount' | 'noOffer'>('noOffer');
  const [customers, setCustomers] = useState<Customer[]>(mockData);

  // جلب نوع العرض الشهري وبيانات العملاء من الخادم
  useEffect(() => {
    const fetchMonthlyOfferAndCustomers = async () => {
      try {
        // جلب العرض الشهري من الخادم
        const offerResponse = await fetch('http://localhost:3000/offer');
        const offerData = await offerResponse.json();

        if (offerData.offerType) {
          setFilter(offerData.offerType);
        } else {
          setFilter('noOffer');
        }

        // جلب بيانات العملاء من الخادم
        const customersResponse = await fetch('http://localhost:3000/api/top-customers');
        const customersData = await customersResponse.json();
        setCustomers(customersData);

      } catch (error) {
        console.error('Error fetching data:', error);
        // استخدام البيانات المؤقتة إذا حدث خطأ
        setCustomers(mockData);
      }
    };

    fetchMonthlyOfferAndCustomers();
  }, []);

  // ترتيب البيانات بناءً على الفلتر الحالي
  const sortedData = [...customers].sort((a, b) => {
    if (filter === 'noOffer') return 0;
    return b[filter] - a[filter];
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toppkunder</Text>

      {/* عرض الرسالة عند عدم وجود عرض */}
      {filter === 'noOffer' ? (
        <Text style={styles.noOfferText}>Håll utkik efter nästa tävling och ta dig till toppen!</Text>
      ) : (
        <FlatList
          data={sortedData}
          keyExtractor={(item) => item.kundnummer}
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <Text style={styles.rank}>{index + 1}.</Text>
              <Text style={styles.kundnummer}>Kundnummer: {item.kundnummer}</Text>
              <Text style={styles.value}>
                {filter === 'visits' && `Antal Besök: ${item.visits}`}
                {filter === 'purchases' && `Antal Köp: ${item.purchases}`}
                {filter === 'totalAmount' && `Köpsumma: ${item.totalAmount} kr`}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    color: '#E6007E',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  noOfferText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rank: {
    fontSize: 16,
    width: '10%',
  },
  kundnummer: {
    fontSize: 16,
    width: '40%',
  },
  value: {
    fontSize: 16,
    width: '40%',
    textAlign: 'right',
  },
});
