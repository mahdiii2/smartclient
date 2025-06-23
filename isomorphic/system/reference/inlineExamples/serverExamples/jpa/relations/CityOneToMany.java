package com.isomorphic.examples.server.jpa.relations;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name="city")
public class CityOneToMany
    implements Serializable
{

    @Id
    @Column (nullable = false)
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long cityId;

    @Column (nullable = false)
    private String cityName;

    public CityOneToMany ()
    {
    }

    public Long getCityId ()
    {
        return cityId;
    }

    public void setCityId (Long cityId)
    {
        this.cityId = cityId;
    }

    public String getCityName ()
    {
        return cityName;
    }

    public void setCityName (String cityName)
    {
        this.cityName = cityName;
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
               + "cityId=" + ((getCityId() == null) ? "null" : getCityId().toString())
               + ", "
               + "cityName=" + ((getCityName() == null) ? "null" : getCityName().toString())
               + "]";
    }

}
