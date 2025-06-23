package com.isomorphic.examples.server.hibernate.relations;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name="continent")
public class ContinentManyToOneSimple
    implements Serializable
{

    @Id
    @Column (nullable = false)
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long continentId;

    @Column (nullable = false)
    private String continentName;

    public ContinentManyToOneSimple ()
    {
    }

    public Long getContinentId() {
        return continentId;
    }

    public void setContinentId(Long continentId) {
        this.continentId = continentId;
    }

    public String getContinentName() {
        return continentName;
    }

    public void setContinentName(String continentName) {
        this.continentName = continentName;
    }

    /**
     * Returns a string representation of the object. Resulting string contains
     * full name of the class and list of its properties and their values.
     *
     * @return <code>String</code> representation of this object.
     */
    @Override
    public String toString ()
    {
        return getClass().getName()
               + "["
               + "continentId=" + ((getContinentId() == null) ? "null" : getContinentId().toString())
               + ", "
               + "continentName=" + ((getContinentName() == null) ? "null" : getContinentName().toString())
               + "]";
    }


}
