package com.isomorphic.examples.server.hibernate.relations;

import org.hibernate.annotations.ForeignKey;

import java.io.Serializable;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table (name="country")
public class CountryOneToMany
    implements Serializable
{

    @Id
    @Column (nullable = false)
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long countryId;

    private String countryCode;

    @Column (nullable = false)
    private String countryName;

    @OneToMany(cascade={CascadeType.ALL}, orphanRemoval=true)
    @JoinColumn(name="countryId", referencedColumnName="countryId")
    @ForeignKey(name="none")
    private List<CityOneToMany> cities;

    public CountryOneToMany ()
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

    public List<CityOneToMany> getCities() {
        return cities;
    }

    public void setCities(List<CityOneToMany> cities) {
        this.cities = cities;
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
