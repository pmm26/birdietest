const Events = require('../models/Events')

const fetchEvents = async (req, res, next) =>  {
  const events = await Events.fetchAll()
  console.log(events)
  
  res.status(200).json({
    greetings: 'Thank you for spending some time on this test. All the best 🙌'
  });
}

module.exports = {
  fetchEvents
}