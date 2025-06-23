//----------------------------------------------------------------------
// Isomorphic SmartClient
// Master-Detail load and save example (Hibernate)
//
// OrderItem Bean - to be managed by Hibernate
//----------------------------------------------------------------------

package com.isomorphic.examples.server.masterDetail;

import java.io.Serializable;
import jakarta.persistence.*;

@Entity
@Table(name = "masterDetail_orderItem")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;

    @Column(name = "itemDescription")
    private String itemDescription;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "unitPrice")
    private Float unitPrice;

    @ManyToOne
    @JoinColumn(name = "orderID")
    private Order order;

    public OrderItem() { }

    // Getters
    public String getItemDescription() { return itemDescription; }
    public Order getOrder() { return order; }
    public Long getPk() { return pk; }
    public Long getQuantity() { return quantity; }
    public Float getUnitPrice() { return unitPrice; }

    // Setters
    public void setItemDescription(String itemDescription) { this.itemDescription = itemDescription; }
    public void setOrder(Integer orderID) { this.order = order; }
    public void setPk(Long pk) { this.pk = pk; }
    public void setQuantity(Long quantity) { this.quantity = quantity; }
    public void setUnitPrice(Float unitPrice) { this.unitPrice = unitPrice; }
    
}

