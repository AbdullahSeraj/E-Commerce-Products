const stripe = require("../config/stripe");
const Order = require("../models/Order");
const User = require("../models/User");

// https://github.com/stripe/stripe-cli/releases/tag/v1.20.0
//

// const paymentController = async (req, res) => {
//   try {
//     const { cartItems } = req.body;
//     const user = await User.findOne({ _id: req.user });

//     const params = {
//       submit_type: "pay",
//       mode: "payment",
//       payment_method_types: ["card"],
//       billing_address_collection: "auto",
//       shipping_options: [
//         {
//           shipping_rate: "shr_1PUXXcP6CDNJqnGexTYTwwam",
//         },
//       ],
//       customer_email: user.email,
//       metadata: {
//         userId: req.user,
//       },
//       line_items: cartItems.map((item, index) => {
//         return {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: item.product.title,
//               images: item.product.images,
//               metadata: {
//                 productId: item.product._id,
//               },
//             },
//             unit_amount: item.product.selling * 100,
//           },
//           adjustable_quantity: {
//             enabled: true,
//             minimum: 1,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: `${process.env.FRONTEND_URL}/success`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//     };

//     const session = await stripe.checkout.sessions.create(params);
//     res.json(session);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// async function getLineItems(lineItems) {
//   let ProductItems = [];

//   if (lineItems?.data?.length) {
//     for (const item of lineItems.data) {
//       const product = await stripe.products.retrieve(item.price.product);
//       const productId = product.metadata.productId;

//       const productData = {
//         productId: productId,
//         name: product.name,
//         price: item.price.unit_amount / 100,
//         quantity: item.quantity,
//         images: product.images,
//       };

//       ProductItems.push(productData);
//     }
//   }

//   return ProductItems;
// }

// const webhooks = async (req, res) => {
//   const endpointSecret = process.env.STRIPE_ENPOINT_WEBHOOK_SECRET_KEY;

//   const sig = req.headers["stripe-signture"];
//   const payloadString = JSON.stringify(req.body);
//   const header = stripe.webhooks.generateTestHeaderString({
//     payload: payloadString,
//     secret: endpointSecret,
//   });

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       payloadString,
//       header,
//       endpointSecret
//     );
//   } catch (error) {
//     res.status(400).send(`Webhook Error: ${error.message}`);
//     return;
//   }

//   switch (event.type) {
//     // case 'payment_intent.succeeded':
//     case "checkout.session.completed":
//       const session = event.data.object;

//       const lineItems = await stripe.checkout.sessions.listLineItems(
//         session.id
//       );

//       const productDetails = await getLineItems(lineItems);

//       const orderDetails = {
//         productDetails: productDetails,
//         email: session.customer_email,
//         userId: session.metadata.userId,
//         paymentDetails: {
//           paymentId: session.payment_intent,
//           payment_method_type: session.payment_method_types,
//           payment_status: session.payment_status,
//         },
//         shipping_options: session.shipping_options.map((s) => {
//           return { ...s, shipping_amount: s.shipping_amount / 100 };
//         }),
//         totalAmount: session.amount_total / 100,
//       };

//       const order = new Order(orderDetails);
//       const saveOrder = await order.save();
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   res.status(200).send();
// };

const getOrder = async (req, res) => {
  const userId = req.user;

  const orders = await Order.find({ userId: userId });

  if (!orders?.length && orders?.length === 0) {
    res.status(300).json({ message: "Not found any order" });
  }

  res.json(orders);
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find();

  if (!orders?.length && orders?.length === 0) {
    res.status(300).json({ message: "Not found any order" });
  }

  res.json(orders);
};

module.exports = { getOrder, getAllOrders };
