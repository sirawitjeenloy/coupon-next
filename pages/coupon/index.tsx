import { Avatar, Badge, Button, Drawer, Form, Select, Typography } from "antd";
import {
  DISCOUNT_TYPE_OPTIONS,
  ITEM,
  ItemInterface,
} from "../../constants/item";
import { ElementDiscountCoupon } from "../../element/coupon";
import { ElementItem } from "../../element/item";
import React from "react";

const { Text } = Typography;

export interface CartInterface {
  item: ItemInterface;
  amount: number;
}

export default function CouponPage() {
  const [cart, setCart] = React.useState<CartInterface[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);

  const [form] = Form.useForm<{
    type: "FIXED" | "PERCENTAGE" | "BY_ITEM" | "POINT" | "SPECIAL";
  }>();
  const type = Form.useWatch("type", form);

  //#region function
  function onSelectItem(item: ItemInterface, amount: number) {
    const selected = cart.find((f) => f.item.key == item.key);
    if (selected) {
      const index = cart.findIndex((f) => f.item.key == item.key);
      let tmp = [...cart];
      tmp[index] = { item, amount };
      setCart(tmp);
    } else {
      setCart((prev) => prev.concat([{ item, amount }]));
    }
  }

  function onRemove(item: ItemInterface) {
    setCart((prev) => prev.filter((f) => f.item.key != item.key));
  }

  //#endregion

  //#region useMemo
  const total_price = React.useMemo(() => {
    let total = 0;
    cart.forEach((c) => {
      total += c.amount * c.item.price;
    });
    return total;
  }, [cart]);
  //#endregion

  return (
    <>
      <Drawer open={open} width={480} onClose={() => setOpen(false)}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Form form={form}>
            <Form.Item
              name={"type"}
              style={{ width: "100%" }}
              label="Discount Type"
            >
              <Select
                options={DISCOUNT_TYPE_OPTIONS}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>
          {type && (
            <ElementDiscountCoupon
              title={
                DISCOUNT_TYPE_OPTIONS.find((f) => f.value == type)
                  ?.label as string
              }
              type={type}
              total_price={total_price}
              cart={cart}
            />
          )}
        </div>
      </Drawer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          width: "100%",
          justifyContent: "end",
          borderRadius: "0px 0px 16px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 8,
          }}
        >
          <Badge
            count={cart.length}
            style={{ cursor: "pointer", margin: 8 }}
            onClick={() => setOpen(true)}
          >
            <Avatar shape="square" size="large" />
          </Badge>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr",
          padding: 64,
          gap: 16,
        }}
      >
        {ITEM.map((item, idx) => {
          return (
            <ElementItem
              key={`item-${idx}`}
              item={item}
              onSelected={onSelectItem}
              cart={cart}
              onRemove={onRemove}
              onlyShow={false}
            />
          );
        })}
      </div>
    </>
  );
}