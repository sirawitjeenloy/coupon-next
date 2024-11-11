import {
    Button,
    Card,
    Divider,
    Form,
    Image,
    InputNumber,
    Typography,
  } from "antd";
  import { ItemInterface } from "../constants/item";
  import React from "react";
  import { CartInterface } from "../pages/coupon";
  
  const { Text } = Typography;
  
  interface ElementItemProp {
    item: ItemInterface;
    onSelected?: (item: ItemInterface, amount: number) => void;
    onRemove?: (item: ItemInterface) => void;
    cart: CartInterface[];
    onlyShow: boolean;
    total_price?: number;
  }
  
  export const ElementItem = (props: ElementItemProp) => {
    const { item, onSelected, cart, onRemove, onlyShow, total_price } = props;
  
    const [form] = Form.useForm<{ amount: number }>();
  
    const amount = Form.useWatch("amount", form);
  
    const isSelected = React.useMemo(() => {
      return cart.find((c) => c.item.key == item.key);
    }, [cart]);
  
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: isSelected ? "#e9e9e9" : "white",
          padding: 16,
          borderRadius: 16,
        }}
      >
        <Text style={{ fontSize: 32 }}>{item.title}</Text>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Image
            preview={false}
            src={item.imgSrc}
            style={{
              width: "132px",
              height: "132px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <Text>{`Price: ${new Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
          }).format(item.price)}`}</Text>
        </div>
  
        {!onlyShow && (
          <Form form={form}>
            <Form.Item
              name="amount"
              style={{ width: "100%" }}
              label="Amount"
              initialValue={0}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        )}
        {onlyShow ? (
          <Text>{`Total: ${new Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
          }).format(total_price || 0)}`}</Text>
        ) : (
          <Text>{`Total: ${new Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
          }).format(amount * item.price)}`}</Text>
        )}
  
        {!onlyShow && (
          <>
            <Divider style={{ margin: "8px 0px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "end",
                gap: 4,
              }}
            >
              <Button
                style={{ color: "red", borderColor: "red" }}
                onClick={() => {
                  if (!onlyShow && onRemove) onRemove(item);
                }}
              >
                Remove
              </Button>
              <Button
                style={{ color: "blue", borderColor: "blue" }}
                onClick={() => {
                  if (!onlyShow && onSelected) onSelected(item, amount);
                }}
              >
                Add
              </Button>
            </div>
          </>
        )}
      </div>
    );
  };