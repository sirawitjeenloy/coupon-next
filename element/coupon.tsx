import {
    Button,
    Card,
    Carousel,
    Divider,
    Form,
    InputNumber,
    Modal,
    Select,
    Typography,
  } from "antd";
  import { calculateDiscount } from "../method/discount";
  import React from "react";
  import { CartInterface } from "../pages/coupon";
  import { ElementItem } from "./item";
  import { CATEGORY_OPTIONS } from "../constants/item";
  
  const { Text } = Typography;
  
  interface ElementDiscountCouponProps {
    title: string;
    type: "FIXED" | "PERCENTAGE" | "BY_ITEM" | "POINT" | "SPECIAL";
    total_price: number;
    cart: CartInterface[];
  }
  
  export const ElementDiscountCoupon = (props: ElementDiscountCouponProps) => {
    const { title, type, total_price, cart } = props;
    const [form] = Form.useForm<{ discount: number; every: number }>();
  
    const category = Form.useWatch("category", form);
    const [net, setNet] = React.useState<number>(total_price);
  
    //#region function
    async function onSubmit() {
      try {
        const formValues = await form.validateFields();
        const { discount, every } = formValues;
  
        setNet(
          calculateDiscount({
            total_price,
            discount,
            type,
            cart,
            category,
            every,
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
  
    async function onClear() {
      form.resetFields();
      setNet(total_price);
    }
    //#endregion
  
    return (
      <Card title={title}>
        <Form form={form}>
          <Text>{`Total Price : ${new Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
          }).format(total_price)}`}</Text>
          <div style={{ margin: 16 }} />
          {cart.map(({ item, amount }, idx) => {
            return (
              <>
                <ElementItem
                  key={`item-${idx}`}
                  item={item}
                  cart={cart}
                  onlyShow
                  total_price={item.price * amount}
                />
                <div style={{ margin: 16 }} />
              </>
            );
          })}
  
          {type == "BY_ITEM" && (
            <Form.Item
              name={"category"}
              label="Category"
              rules={[
                {
                  required: type == "BY_ITEM",
                },
              ]}
            >
              <Select options={CATEGORY_OPTIONS} />
            </Form.Item>
          )}
          {type == "SPECIAL" && (
            <Form.Item
              name={`every`}
              label="Every"
              style={{ width: "100%", marginTop: 16 }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                placeholder="Please input discount"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}
  
          <Form.Item
            name={"discount"}
            label={"Discount"}
            style={{ width: "100%", marginTop: 16 }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              placeholder="Please input discount"
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
  
          <Divider style={{ margin: "0px 0px 16px 0px" }} />
          <Text>{`Net: ${new Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
          }).format(net)}`}</Text>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              width: "100%",
              gap: 4,
              marginTop: 16,
            }}
          >
            <Button
              style={{ border: "1px solid red", color: "red" }}
              onClick={() => {
                onClear();
              }}
            >
              Clear
            </Button>
            <Button
              style={{ border: "1px solid blue", color: "blue" }}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    );
  };