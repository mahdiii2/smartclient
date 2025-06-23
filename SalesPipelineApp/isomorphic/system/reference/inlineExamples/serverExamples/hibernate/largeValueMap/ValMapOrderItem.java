//----------------------------------------------------------------------
// Isomorphic SmartClient
// Large Valuemap example (Hibernate)
//
// OrderItem Bean - to be managed by Hibernate
//----------------------------------------------------------------------

package com.isomorphic.examples.server.largeValueMapHibernate;

import java.util.Date;
import java.io.Serializable;
import jakarta.persistence.*;

@Entity
@Table(name = "valMapOrderItemHB")
public class ValMapOrderItem implements Serializable {

    // this bean has no business logic.  It simply stores data in these instance variables.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;

    @Column(name = "orderID")
    private Long orderID;

    @Temporal(TemporalType.DATE)
    @Column(name = "orderDate")
    private Date orderDate;

    @Column(name = "unitPrice")
    private double unitPrice;

    @Column(name = "quantity")
    private Long quantity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "itemID", insertable = false, updatable = false)
    private ValMapSupplyItem item;

    public ValMapOrderItem() { }

    // Getters
    public ValMapSupplyItem getItem() { return item; }
    public Date getOrderDate() { return orderDate; }
    public Long getOrderID() { return orderID; }
    public Long getPk() { return pk; }
    public Long getQuantity() { return quantity; }
    public double getUnitPrice() { return unitPrice; }

    // Setters
    public void setItem(ValMapSupplyItem item) { this.item = item; }
    public void setOrderDate(Date orderDate) { this.orderDate = orderDate; }
    public void setOrderID(Long orderID) { 
        this.orderID = orderID; 
    }
    public void setPk(Long pk) { this.pk = pk; }
    public void setQuantity(Long quantity) { this.quantity = quantity; }
    public void setUnitPrice(double unitPrice) { this.unitPrice = unitPrice; }
    
}

