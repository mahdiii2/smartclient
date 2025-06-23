//----------------------------------------------------------------------
// Isomorphic SmartClient
// Minimal Java server integration example (Tree bean databinding)
//
// SupplyCategory Bean
//
//    -- provides a simple persistent data structure for this example
//
//----------------------------------------------------------------------

package com.isomorphic.examples;

import java.io.Serializable;

public class SupplyCategory implements Serializable {
    protected String categoryName;
    protected String parentID;

    public SupplyCategory() { } 

    public void setCategoryName(String name) { categoryName = name; }
    public void setParentID(String id) { parentID = id; }
    
    public String getCategoryName() { return categoryName; }
    public String getParentID() { return parentID; }
    
}

