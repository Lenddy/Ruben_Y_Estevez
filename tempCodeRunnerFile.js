
const payments = [
    {
      _id: 1,
      isPaid: true,
    },
    {
      _id: 2,
      isPaid: false,
    },
    {
      _id: 3,
      isPaid: false,
    },
  ];
  
  const idThreshold = 2;
  
  const filteredPayments = payments.filter(p => p._id <= idThreshold && p.isPaid == false);
  
  console.log(filteredPayments);
