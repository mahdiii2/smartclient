//----------------------------------------------------------------------
// Isomorphic SmartClient
// Data Selection example
//
// FlatUser Bean - to be managed by Hibernate
//----------------------------------------------------------------------

package com.isomorphic.examples.server.flattenedBeans;

import java.io.Serializable;
import jakarta.persistence.*;

@Entity
@Table(name = "flattenedBeans_flatUser")
public class FlatUser implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "surname")
    private String surname;

    @Column(name = "email")
    private String email;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "addressId", unique = true)
    private Address address;

    protected String password;

    // In a complete system, User objects are typically related to several other entities
    // similar to the samples commented out below.  Naive data delivery systems send 
    // all related entities to the browser unless extra code is written to define exactly
    // what to send.  By contrast, SmartClient Server delivers just those fields defined in
    // the DataSource, if DataSource.dropExtraFields is set.  Using the DataSource definition 
    // to select and trim data in this way avoids extra work and makes it easy to audit 
    // exactly what data is visible to users.
    //
    // Collection<Account> accounts;
    // Collection<Project> projects;
    
    
    public FlatUser() { }

    // Getters
    public Long getUserId() { return userId; }
    public String getFirstName() { return firstName; }
    public String getSurname() { return surname; }
    public String getEmail() { return email; }
    public Address getAddress() { return address; }
    public String getPassword() { return password; }

    // Setters
    public void setUserId(Long value) { userId = value; }
    public void setFirstName(String value) { firstName = value; }
    public void setSurname(String value) { surname = value; }
    public void setEmail(String value) { email = value; }
    public void setAddress(Address value) { address = value; }
    public void setPassword(String value) { password = value; }
    
}

