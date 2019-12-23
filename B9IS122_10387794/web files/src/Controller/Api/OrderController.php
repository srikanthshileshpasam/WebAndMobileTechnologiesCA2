<?php

namespace App\Controller\Api;

use App\Entity\OrderProducts;
use App\Entity\Orders;
use App\Entity\Products;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class OrderController extends AbstractController
{
    /**
     * @Route("/api/order/checkout", name="api_order_check_out")
     */
    public function index(Request $request)
    {
        $order = New Orders();
        $order->setTotal($request->get('totalPrices'));
        $order->setStatus(false);
        $order->setUser($this->getDoctrine()->getRepository(User::class)->find($request->get('id')));
        $em = $this->getDoctrine()->getManager();
        $em->persist($order);
        $em->flush();
        foreach ($request->get('cart') as $cart) {
            $orderProducts = New OrderProducts();
            $orderProducts->setOrders($order);
            $orderProducts->setQty(1);
            $orderProducts->setProduct($this->getDoctrine()->getRepository(Products::class)->find($cart['id']));
            $em->persist($orderProducts);
            $em->flush();
        }
        return ['status' => 'success'];
        return $request->request->all();
        return $this->render('api/order/index.html.twig', [
            'controller_name' => 'OrderController',
        ]);
    }

    /**
     * @Route("/api/orders", name="api_order_list")
     */
    public function orderList() {
        $orders = $this->getDoctrine()->getRepository(Orders::class)->findBy([],['id' => 'DESC'],100);
        $finalArray = [];
        foreach ($orders as $order) {
            $orderProducts = $this->getDoctrine()->getRepository(OrderProducts::class)->findBy(['Orders' => $order->getId()]);
            $array = ['order' => $order, 'products' => $orderProducts];
            array_push($finalArray, $array);
        }
        return $finalArray;
    }
    /**
     * @Route("/api/orders/mark", name="api_order_mark")
     */
    public function orderMark(Request $request) {
        $em = $this->getDoctrine()->getManager();
        $order = $em->getRepository(Orders::class)->find($request->get('id'));
//        return $order;
        $order->setStatus($request->get('status'));
        $em->flush();
        return 'success';
    }
}
