//----------------------------------------------------------------------
// Isomorphic SmartClient
//
// SupplyItemDMI implementation
//
//----------------------------------------------------------------------

package com.isomorphic.examples;

import java.util.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class GetTimeStampDMI {

    public Date getTimeStamp(Date clientDate) {
        System.out.println("+++++++++++++++++++++++++++++++++++++++++++++");
        System.out.println("Current client time: " + clientDate.toString());
        System.out.println("+++++++++++++++++++++++++++++++++++++++++++++");

        // send back our own time as the response
        return new Date();
    }


}
