#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Mar  3 12:44:15 2017

@author: joshwondra
"""

import braintree

braintree.Configuration.configure(braintree.Environment.Sandbox,
                                  merchant_id="7wfykfkzpwbst25r",
                                  public_key="53fdkhmwbjptx4xj",
                                  private_key="fb816bd31f23482e6f31019a5a1325a5")

client_token = braintree.ClientToken.generate()
