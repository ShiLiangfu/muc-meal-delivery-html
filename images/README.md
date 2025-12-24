# 图片资源说明

## 文件夹结构

```
public/images/
├── merchants/                    # 商家专属文件夹
│   ├── kfc-changqing/           # 肯德基宅急送（长青路店）
│   │   ├── logo/
│   │   │   └── logo.jpg         # 商家logo
│   │   └── products/            # 商品图片
│   │       ├── classic-burger.jpg    # 经典汉堡
│   │       ├── spicy-chicken.jpg     # 香辣鸡腿堡
│   │       ├── fries.jpg            # 薯条
│   │       └── cola.jpg             # 可乐
│   │
│   ├── bawang-yungang/          # 霸王茶姬（云岗物美店）
│   │   ├── logo/
│   │   │   └── logo.jpg         # 商家logo
│   │   └── products/            # 商品图片
│   │       ├── boya-jue-xian.jpg     # 伯牙绝弦
│   │       ├── bai-wu-hong-chen.jpg  # 白雾红尘
│   │       ├── qian-feng-cui.jpg     # 千峰翠
│   │       └── zhi-xiang-ning.jpg    # 栀香柠
│   │
│   └── future-merchant/         # 未来新增商家示例
│       ├── logo/
│       │   └── logo.jpg
│       └── products/
│           ├── product1.jpg
│           └── product2.jpg
│
└── default/                     # 默认图片
    ├── merchant-logo.jpg        # 默认商家logo
    └── product.jpg              # 默认商品图片
```

## 使用说明

### 1. 商家logo显示
代码中使用 `getMerchantLogo(merchantId)` 函数自动生成商家logo路径：
- 肯德基 (ID: 1) → `/images/merchants/kfc-changqing/logo/logo.jpg`  
- 霸王茶姬 (ID: 2) → `/images/merchants/bawang-yungang/logo/logo.jpg`

### 2. 商品图片显示
代码中使用 `getProductImage(merchantId, productId)` 函数自动生成商品图片路径：
- 肯德基经典汉堡 (商家ID: 1, 商品ID: 1) → `/images/merchants/kfc-changqing/products/classic-burger.jpg`
- 霸王茶姬伯牙绝弦 (商家ID: 2, 商品ID: 5) → `/images/merchants/bawang-yungang/products/boya-jue-xian.jpg`

### 3. 新增商家
添加新商家时，请按以下步骤操作：

1. **创建文件夹结构**：
   ```
   public/images/merchants/new-merchant-key/
   ├── logo/
   │   └── logo.jpg
   └── products/
       ├── product1.jpg
       └── product2.jpg
   ```

2. **更新 imageUtils.js**：
   - 在 `MERCHANT_KEYS` 中添加商家映射
   - 在 `PRODUCT_IMAGE_MAP` 中添加商品图片映射

3. **替换占位文件**：
   - 将真实的商家logo替换 `logo/logo.jpg`
   - 将真实的商品图片替换对应的产品图片文件

### 4. 图片要求
- **格式**：建议使用 JPG 或 PNG 格式
- **尺寸**：
  - 商家logo：建议 200x200px 或以上正方形
  - 商品图片：建议 300x300px 或以上正方形
- **大小**：单个文件建议不超过 500KB

### 5. 注意事项
- 文件名必须与 `imageUtils.js` 中的映射保持一致
- 如果图片文件不存在，系统会自动回退到默认图片
- 建议对图片进行适当压缩以提高页面加载速度
