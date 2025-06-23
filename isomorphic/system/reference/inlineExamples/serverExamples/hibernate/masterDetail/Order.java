//----------------------------------------------------------------------
// Isomorphic SmartClient
// Master-Detail load and save example (Hibernate)
//
// Order Bean - to be managed by Hibernate
//----------------------------------------------------------------------

package com.isomorphic.examples.server.masterDetail;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "masterDetail_order")
public class Order implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderID;

    @Column(name = "customerName")
    private String customerName;

    @Temporal(TemporalType.DATE)
    @Column(name = "orderDate")
    private Date orderDate;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<OrderItem> items;

    @Column(name = "trackingNumber")
    private Long trackingNumber;

    public Order() { }

    // Getters
    public String getCustomerName() { return customerName; }
    public Date getOrderDate() { return orderDate; }
    public Long getOrderID() { return orderID; }
    public Long getTrackingNumber() { return trackingNumber; }
    public Set getItems() { return items; }

    // Setters
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public void setOrderDate(Date orderDate) { this.orderDate = orderDate; }
    public void setOrderID(long orderID) { this.orderID = orderID; }
    public void setTrackingNumber(Long trackingNumber) { this.trackingNumber = trackingNumber; }
    public void setItems(Set items) { this.items = items; }

}

