<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\OrderProductsRepository")
 */
class OrderProducts
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $qty;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Orders")
     * @ORM\JoinColumn(nullable=false)
     */
    private $Orders;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Products")
     * @ORM\JoinColumn(nullable=false)
     */
    private $Product;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQty(): ?int
    {
        return $this->qty;
    }

    public function setQty(int $qty): self
    {
        $this->qty = $qty;

        return $this;
    }

    public function getOrders(): ?Orders
    {
        return $this->Orders;
    }

    public function setOrders(?Orders $Orders): self
    {
        $this->Orders = $Orders;

        return $this;
    }

    public function getProduct(): ?Products
    {
        return $this->Product;
    }

    public function setProduct(?Products $Product): self
    {
        $this->Product = $Product;

        return $this;
    }
}
