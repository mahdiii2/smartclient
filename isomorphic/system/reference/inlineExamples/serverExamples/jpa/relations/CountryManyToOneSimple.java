package com.isomorphic.examples.server.jpa.relations;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table (name="country")
public class CountryManyToOneSimple
    implements Serializable
{

    @Id
    @Column (nullable = false)
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long countryId;

    @Column (nullable = false)
    private String countryCode;

    @Column (nullable = false)
    private String countryName;

    @ManyToOne
    @JoinColumn(name="continentId", referencedColumnName="continentId")
    private ContinentManyToOneSimple continent;

    public CountryManyToOneSimple ()
    {
    }

    public Long getCountryId ()
    {
        return countryId;
    }

    public void setCountryId (Long countryId)
    {
        this.countryId = countryId;
    }

    public String getCountryCode ()
    {
        return countryCode;
    }

    public void setCountryCode (String countryCode)
    {
        this.countryCode = countryCode;
    }

    public String getCountryName ()
    {
        return countryName;
    }

    public void setCountryName (String countryName)
    {
        this.countryName = countryName;
    }

    public ContinentManyToOneSimple getContinent() {
        return continent;
    }

    public void setContinent(ContinentManyToOneSimple continent) {
        this.continent = continent;
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
               + "countryId=" + ((getCountryId() == null) ? "null" : getCountryId().toString())
               + ", "
               + "countryCode=" + ((getCountryCode() == null) ? "null" : getCountryCode().toString())
               + ", "
               + "countryName=" + ((getCountryName() == null) ? "null" : getCountryName().toString())
               + "]";
    }

}
