#! /usr/bin/env python3.6
"""
Python 3.6 or newer required.
"""
import json
import os
import stripe

# This is your test secret API key.
stripe.api_key = 'sk_test_51QXzhLHYe69JtepG0zrOW4ii9BMmFv7xF7a7lrxNnbwCyV8oATfgJmofaVTgJbyfxxW6WmyEOOfyoJvnpefnaSlC00mcSupkh3'

from flask import Flask, render_template, jsonify, request


app = Flask(__name__, static_folder='public',
            static_url_path='', template_folder='public')

def calculate_tax(items, currency):
    tax_calculation = stripe.tax.Calculation.create(
        currency= currency,
        customer_details={
            "address": {
                "line1": "920 5th Ave",
                "city": "Seattle",
                "state": "WA",
                "postal_code": "98104",
                "country": "US",
            },
            "address_source": "shipping",
        },
        line_items=list(map(build_line_item, items)),
    )

    return tax_calculation


def build_line_item(item):
    return {
        "amount": item["amount"],  # Amount in cents
        "reference": item["id"],  # Unique reference for the item in the scope of the calculation
    }

# Securely calculate the order amount, including tax
def calculate_order_amount(items, tax_calculation):
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total with any exclusive taxes on the server to prevent
    # people from directly manipulating the amount on the client
    order_amount = 1400
    order_amount += tax_calculation['tax_amount_exclusive']
    return order_amount


@app.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        # Create a Tax Calculation for the items being sold
        tax_calculation = calculate_tax(data['items'], 'chf')

        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data['items'], tax_calculation),
            currency='chf',
            # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods={
                'enabled': True,
            },
            metadata={
              'tax_calculation': tax_calculation['id']
            },
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403

# Invoke this method in your webhook handler when `payment_intent.succeeded` webhook is received
def handle_payment_intent_succeeded(payment_intent):
    # Create a Tax Transaction for the successful payment
    stripe.tax.Transaction.create_from_calculation(
        calculation=payment_intent['metadata']['tax_calculation'],
        reference="myOrder_123",  # Replace with a unique reference from your checkout/order system
    )

if __name__ == '__main__':
    app.run(port=4242)
