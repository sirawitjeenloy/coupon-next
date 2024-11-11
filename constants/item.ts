import { Rule } from "antd/es/form";
import { DefaultOptionType } from "antd/es/select";

export interface ItemInterface {
  key: string;
  title: string;
  category: "CLOTHING" | "ACCESSORIES";
  price: number;
  imgSrc: string;
}

export const ITEM: ItemInterface[] = [
  {
    key: "TS",
    title: "T-Shirt",
    category: "CLOTHING",
    price: 350,
    imgSrc:
      "https://d2cva83hdk3bwc.cloudfront.net/human-made-dry-alls-graphic-t-shirt-white-1.jpg",
  },
  {
    key: "HT",
    title: "Hat",
    category: "CLOTHING",
    price: 250,
    imgSrc:
      "https://images-cdn.ubuy.co.in/65671b7af1a30b0f0c0632a5-babeyond-straw-fedora-hat-for-men-panama.jpg",
  },
  {
    key: "HD",
    title: "Hoodie",
    category: "CLOTHING",
    price: 700,
    imgSrc:
      "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/zoom/750cc44b179769a6c212f0bd132be814cfe76567_xxl-1.jpg",
  },
  {
    key: "WT",
    title: "Watch",
    category: "ACCESSORIES",
    price: 850,
    imgSrc:
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MXM23ref_FV99_VW_34FR+watch-case-46-aluminum-jetblack-nc-s10_VW_34FR+watch-face-46-aluminum-jetblack-s10_VW_34FR?wid=2000&hei=2000&fmt=png-alpha&.v=1725645481882",
  },
  {
    key: "BG",
    title: "Bag",
    category: "ACCESSORIES",
    price: 640,
    imgSrc:
      "https://assets.hermes.com/is/image/hermesproduct/the-grooming-bag--068312CKAB-front-wm-7-0-0-800-800_g.jpg",
  },
  {
    key: "BL",
    title: "Belt",
    category: "ACCESSORIES",
    price: 230,
    imgSrc:
      "https://assets.hermes.com/is/image/hermesproduct/the-grooming-bag--068312CKAB-front-wm-7-0-0-800-800_g.jpg",
  },
];

//"FIXED" | "PERCENTAGE" | "BY_ITEM" | "POINT" | "SPECIAL";
export const DISCOUNT_TYPE_OPTIONS: DefaultOptionType[] = [
  {
    value: "FIXED",
    label: "Fixed amount",
  },
  {
    value: "PERCENTAGE",
    label: "Percentage discount",
  },
  {
    value: "BY_ITEM",
    label: "Percentage discount by item category",
  },
  {
    value: "POINT",
    label: "Discount by points",
  },
  {
    value: "SPECIAL",
    label: "Special campaigns",
  },
];

export const CATEGORY_OPTIONS = [
  {
    value: "CLOTHING",
    label: "Clothing",
  },
  {
    value: "ACCESSORIES",
    label: "Accessories",
  },
];