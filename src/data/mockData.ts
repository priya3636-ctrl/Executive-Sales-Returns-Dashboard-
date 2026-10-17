import { TransactionRecord, ProductCategory, SalesChannel, ReturnReason } from './types';

// Deterministic Pseudo-Random Number Generator for consistent realistic data
function createPrng(seed: number) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

interface ProductCatalogItem {
  sku: string;
  name: string;
  category: ProductCategory;
  subCategory: string;
  unitPrice: number;
  cost: number;
  baseReturnProb: number;
  favoredReason: ReturnReason;
}

const PRODUCT_CATALOG: ProductCatalogItem[] = [
  // Electronics
  { sku: 'ELE-101', name: 'UltraHD 55" 4K Smart OLED TV', category: 'Electronics', subCategory: 'Televisions', unitPrice: 799.99, cost: 480, baseReturnProb: 0.08, favoredReason: 'Defective / Damaged Item' },
  { sku: 'ELE-102', name: 'Active ANC Wireless Studio Headphones', category: 'Electronics', subCategory: 'Audio', unitPrice: 249.99, cost: 125, baseReturnProb: 0.11, favoredReason: 'Item Not as Described' },
  { sku: 'ELE-103', name: 'ApexPro 14" M3 Ultrabook 16GB', category: 'Electronics', subCategory: 'Computers', unitPrice: 1299.99, cost: 850, baseReturnProb: 0.07, favoredReason: 'Defective / Damaged Item' },
  { sku: 'ELE-104', name: 'Tactile Mechanical Gaming Keyboard', category: 'Electronics', subCategory: 'Accessories', unitPrice: 139.99, cost: 65, baseReturnProb: 0.09, favoredReason: 'Changed Mind / Buyer Remorse' },
  { sku: 'ELE-105', name: 'Smartwatch Series 7 Titanium GPS', category: 'Electronics', subCategory: 'Wearables', unitPrice: 389.99, cost: 210, baseReturnProb: 0.10, favoredReason: 'Item Not as Described' },
  { sku: 'ELE-106', name: 'True Wireless Earbuds with Wireless Case', category: 'Electronics', subCategory: 'Audio', unitPrice: 119.99, cost: 45, baseReturnProb: 0.12, favoredReason: 'Defective / Damaged Item' },

  // Apparel & Footwear
  { sku: 'APP-201', name: 'Men’s Performance All-Day Oxford Shirt', category: 'Apparel & Footwear', subCategory: 'Menswear', unitPrice: 88.00, cost: 32, baseReturnProb: 0.24, favoredReason: 'Sizing & Fit Issue' },
  { sku: 'APP-202', name: 'Women’s Waterproof Trail Runner Shoes', category: 'Apparel & Footwear', subCategory: 'Footwear', unitPrice: 155.00, cost: 65, baseReturnProb: 0.28, favoredReason: 'Sizing & Fit Issue' },
  { sku: 'APP-203', name: '100% Merino Wool Thermal Crewneck', category: 'Apparel & Footwear', subCategory: 'Knitwear', unitPrice: 120.00, cost: 45, baseReturnProb: 0.19, favoredReason: 'Item Not as Described' },
  { sku: 'APP-204', name: 'Handcrafted Heritage Chelsea Boots', category: 'Apparel & Footwear', subCategory: 'Footwear', unitPrice: 240.00, cost: 110, baseReturnProb: 0.25, favoredReason: 'Sizing & Fit Issue' },
  { sku: 'APP-205', name: 'Stretch Tech Slim Commuter Chinos', category: 'Apparel & Footwear', subCategory: 'Pants', unitPrice: 94.00, cost: 38, baseReturnProb: 0.22, favoredReason: 'Sizing & Fit Issue' },
  { sku: 'APP-206', name: 'Women’s Lightweight Down Puffer Parka', category: 'Apparel & Footwear', subCategory: 'Outerwear', unitPrice: 210.00, cost: 85, baseReturnProb: 0.21, favoredReason: 'Sizing & Fit Issue' },

  // Home & Kitchen
  { sku: 'HOM-301', name: 'Precision Espresso Machine & Grinder', category: 'Home & Kitchen', subCategory: 'Coffee Appliances', unitPrice: 599.99, cost: 310, baseReturnProb: 0.14, favoredReason: 'Defective / Damaged Item' },
  { sku: 'HOM-302', name: '5-Ply Stainless Steel Cookware 10-Piece', category: 'Home & Kitchen', subCategory: 'Cookware', unitPrice: 349.99, cost: 160, baseReturnProb: 0.12, favoredReason: 'Item Not as Described' },
  { sku: 'HOM-303', name: 'HEPA Smart Air Purifier Pro Max', category: 'Home & Kitchen', subCategory: 'Air Quality', unitPrice: 199.99, cost: 95, baseReturnProb: 0.13, favoredReason: 'Changed Mind / Buyer Remorse' },
  { sku: 'HOM-304', name: 'Autonomous LiDAR Robot Vacuum & Mop', category: 'Home & Kitchen', subCategory: 'Floor Care', unitPrice: 489.99, cost: 245, baseReturnProb: 0.17, favoredReason: 'Defective / Damaged Item' },
  { sku: 'HOM-305', name: 'Enameled Cast Iron Signature Dutch Oven 6Qt', category: 'Home & Kitchen', subCategory: 'Bakeware', unitPrice: 175.00, cost: 70, baseReturnProb: 0.10, favoredReason: 'Defective / Damaged Item' },

  // Sports & Outdoors
  { sku: 'SPO-401', name: 'Four-Season Weatherproof Geodesic Tent', category: 'Sports & Outdoors', subCategory: 'Camping', unitPrice: 320.00, cost: 150, baseReturnProb: 0.13, favoredReason: 'Item Not as Described' },
  { sku: 'SPO-402', name: 'Aero Carbon Fiber Endurance Road Bike', category: 'Sports & Outdoors', subCategory: 'Cycling', unitPrice: 1850.00, cost: 1100, baseReturnProb: 0.08, favoredReason: 'Arrived Too Late' },
  { sku: 'SPO-403', name: 'Adjustable Rapid-Dial Dumbbells (5-52.5 lbs)', category: 'Sports & Outdoors', subCategory: 'Fitness', unitPrice: 399.00, cost: 190, baseReturnProb: 0.15, favoredReason: 'Defective / Damaged Item' },
  { sku: 'SPO-404', name: 'Ultralight Hydration Pack 18L', category: 'Sports & Outdoors', subCategory: 'Hiking', unitPrice: 85.00, cost: 35, baseReturnProb: 0.11, favoredReason: 'Wrong Item Shipped' },
  { sku: 'SPO-405', name: 'Pro Non-Slip Natural Rubber Yoga Mat', category: 'Sports & Outdoors', subCategory: 'Yoga', unitPrice: 78.00, cost: 28, baseReturnProb: 0.10, favoredReason: 'Changed Mind / Buyer Remorse' },

  // Beauty & Personal Care
  { sku: 'BEA-501', name: 'Ionic High-Speed Hair Dryer 1800W', category: 'Beauty & Personal Care', subCategory: 'Hair Styling', unitPrice: 220.00, cost: 95, baseReturnProb: 0.09, favoredReason: 'Defective / Damaged Item' },
  { sku: 'BEA-502', name: 'Ultrasonic Microcurrent Facial Sculptor', category: 'Beauty & Personal Care', subCategory: 'Skincare Tech', unitPrice: 145.00, cost: 58, baseReturnProb: 0.12, favoredReason: 'Changed Mind / Buyer Remorse' },
  { sku: 'BEA-503', name: 'Organic Cold-Pressed Botanical Glow Serum Set', category: 'Beauty & Personal Care', subCategory: 'Skincare', unitPrice: 92.00, cost: 28, baseReturnProb: 0.07, favoredReason: 'Wrong Item Shipped' },
  { sku: 'BEA-504', name: 'Precision Wet/Dry Rotary Electric Shaver', category: 'Beauty & Personal Care', subCategory: 'Grooming', unitPrice: 110.00, cost: 48, baseReturnProb: 0.09, favoredReason: 'Defective / Damaged Item' }
];

interface StateProfile {
  name: string;
  region: 'West' | 'East' | 'Central' | 'South';
  weight: number;
}

const STATES: StateProfile[] = [
  { name: 'California', region: 'West', weight: 0.22 },
  { name: 'Texas', region: 'South', weight: 0.15 },
  { name: 'New York', region: 'East', weight: 0.14 },
  { name: 'Florida', region: 'South', weight: 0.11 },
  { name: 'Illinois', region: 'Central', weight: 0.08 },
  { name: 'Pennsylvania', region: 'East', weight: 0.06 },
  { name: 'Washington', region: 'West', weight: 0.06 },
  { name: 'Ohio', region: 'Central', weight: 0.05 },
  { name: 'Georgia', region: 'South', weight: 0.05 },
  { name: 'North Carolina', region: 'South', weight: 0.04 },
  { name: 'Colorado', region: 'West', weight: 0.04 }
];

const RETURN_REASONS: ReturnReason[] = [
  'Defective / Damaged Item',
  'Sizing & Fit Issue',
  'Wrong Item Shipped',
  'Item Not as Described',
  'Arrived Too Late',
  'Changed Mind / Buyer Remorse'
];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Realistic seasonal multiplier curve (Retail standard: Q1 quiet, spring bounce, summer stable, Q4 holiday surge)
const MONTHLY_WEIGHTS = [
  0.72, // Jan
  0.70, // Feb
  0.88, // Mar
  0.94, // Apr
  0.98, // May
  1.02, // Jun
  1.05, // Jul
  1.10, // Aug
  1.08, // Sep
  1.15, // Oct
  1.42, // Nov (Black Friday)
  1.55  // Dec (Holiday Season)
];

export function generateSyntheticDataset(recordCount = 820): TransactionRecord[] {
  const prng = createPrng(42817);
  const records: TransactionRecord[] = [];

  let orderSequence = 10001;

  for (let i = 0; i < recordCount; i++) {
    // Determine Month with realistic seasonal distribution
    const randMonthVal = prng();
    let cumulative = 0;
    const totalWeights = MONTHLY_WEIGHTS.reduce((a, b) => a + b, 0);
    let chosenMonthIdx = 0;

    for (let m = 0; m < 12; m++) {
      cumulative += MONTHLY_WEIGHTS[m] / totalWeights;
      if (randMonthVal <= cumulative) {
        chosenMonthIdx = m;
        break;
      }
    }

    const monthNum = chosenMonthIdx + 1;
    const monthName = MONTH_NAMES[chosenMonthIdx];
    const quarter = monthNum <= 3 ? 'Q1' : monthNum <= 6 ? 'Q2' : monthNum <= 9 ? 'Q3' : 'Q4';

    // Day of month (1 to 28)
    const day = Math.floor(prng() * 28) + 1;
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const monthStr = monthNum < 10 ? `0${monthNum}` : `${monthNum}`;
    const date = `2024-${monthStr}-${dayStr}`;

    // Pick State
    const randState = prng();
    let stateCumulative = 0;
    let chosenState = STATES[0];
    for (const st of STATES) {
      stateCumulative += st.weight;
      if (randState <= stateCumulative) {
        chosenState = st;
        break;
      }
    }

    // Pick Product
    const productIdx = Math.floor(prng() * PRODUCT_CATALOG.length);
    const product = PRODUCT_CATALOG[productIdx];

    // Pick Channel (Online: ~58%, Store: ~42%)
    const channel: SalesChannel = prng() > 0.42 ? 'Online' : 'Store';

    // Quantity (1 - 4, weighted towards 1-2)
    const qRand = prng();
    const quantity = qRand > 0.88 ? 3 : qRand > 0.65 ? 2 : 1;

    // Discount (0%, 5%, 10%, 15%, 20%)
    const dRand = prng();
    const discount = dRand > 0.85 ? 0.20 : dRand > 0.65 ? 0.10 : dRand > 0.45 ? 0.05 : 0;

    const grossPrice = product.unitPrice * quantity;
    const salesAmount = Math.round(grossPrice * (1 - discount) * 100) / 100;
    const costAmount = Math.round(product.cost * quantity * 100) / 100;

    // Customer Segment
    const segRand = prng();
    const customerSegment = segRand > 0.75 ? 'Corporate' : segRand > 0.60 ? 'Small Business' : 'Consumer';
    const customerId = `CUST-${1000 + Math.floor(prng() * 600)}`;

    // Grouping orders (some orders have multi-item lines)
    if (prng() > 0.35 || i === 0) {
      orderSequence += 1;
    }
    const orderId = `ORD-2024-${orderSequence}`;

    // Return logic:
    // Online returns are naturally higher in retail than Store returns (sizing issues etc)
    const channelReturnModifier = channel === 'Online' ? 1.25 : 0.80;
    const adjustedReturnProb = product.baseReturnProb * channelReturnModifier;
    const isReturned = prng() < adjustedReturnProb;

    let returnReason: ReturnReason | null = null;
    let returnQuantity = 0;
    let returnAmount = 0;

    if (isReturned) {
      returnQuantity = quantity; // usually full line returned
      returnAmount = salesAmount;

      // Select return reason (biased towards product's favored reason)
      if (prng() < 0.55) {
        returnReason = product.favoredReason;
      } else {
        const reasonIdx = Math.floor(prng() * RETURN_REASONS.length);
        returnReason = RETURN_REASONS[reasonIdx];
      }
    }

    const profitAmount = isReturned ? -Math.round(costAmount * 0.15 * 100) / 100 : Math.round((salesAmount - costAmount) * 100) / 100;

    records.push({
      id: `TXN-${100000 + i}`,
      orderId,
      date,
      year: 2024,
      month: monthNum,
      monthName,
      quarter,
      customerId,
      customerSegment,
      state: chosenState.name,
      region: chosenState.region,
      channel,
      category: product.category,
      subCategory: product.subCategory,
      productSku: product.sku,
      productName: product.name,
      unitPrice: product.unitPrice,
      quantity,
      discount,
      salesAmount,
      costAmount,
      isReturned,
      returnReason,
      returnQuantity,
      returnAmount,
      profitAmount
    });
  }

  // Sort chronologically
  return records.sort((a, b) => a.date.localeCompare(b.date));
}

// Pre-generated static singleton instance for immediate fast render
export const SYNTHETIC_DATASET = generateSyntheticDataset(850);
