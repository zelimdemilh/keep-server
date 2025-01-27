const Order = require("../models/Order.model");
const dayjs = require("dayjs");

module.exports.orderController = {
  getOrder: async (req, res) => {
    try {
      const responce = await Order.find();
      res.status(200).json(responce);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  createOrder: async (req, res) => {
    try {
      // const { clientId, foodId, total, from, to, receivedAt } = req.body;
      const order = await Order.create({
        clientId: req.user.cafeId,
        ...req.body,
        receivedAt: dayjs().format(`HH:mm`),
      });
      res.status(200).json(order);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Заказ удален");
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  acceptOrder: async (req, res) => {
    const courierId = req.user.cafeId;
    try {
      const editedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { courierId: courierId, status: "atCourier" },
        { new: true }
      );
      console.log(editedOrder);
      res.json(editedOrder);
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
  deliverOrder: async (req, res) => {
    // const courierId = req.user.cafeId
    console.log(req.params.id);
    try {
      const currentOrder = await Order.findById(req.params.id);
      currentOrder.status = "atClient";
      await currentOrder.save();
      // const editedOrder = await Order.findByIdAndUpdate(req.params.id, {courierId: courierId, status: "atCourier"}, {new: true});
      console.log(currentOrder);
      res.json(currentOrder);
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
  getOrderById: async (req, res) => {
    try {
      const oneOrder = await Order.findById(req.params.id);
      res.status(200).json(oneOrder);
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
  getOrdersByUserId: async (req, res) => {
    const { cafeId } = req.user;
    try {
      let orders;
      orders = await Order.find({ clientId: cafeId });
      if (!orders.length) {
        orders = await Order.find({ cafeId });
      }
      res.json(orders);
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
};
