//----------------------------------------------------------------------
// Isomorphic SmartClient
//
// SmartClientRPCController implementation
//
//----------------------------------------------------------------------


package com.isomorphic.spring;


import java.io.*;
import java.util.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.isomorphic.servlet.IDACall;

import org.springframework.web.servlet.View;
import org.springframework.web.servlet.mvc.Controller;
import org.springframework.web.servlet.ModelAndView;

public class SmartClientRPCController extends IDACall implements Controller
{


    // Controller interface
    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response)
        throws Exception
    {
        processRequest(request, response);
        
        // this controller handles rendering directly, so no view is required
        return null;
    }

}
