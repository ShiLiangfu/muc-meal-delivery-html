// Vue 3 应用
const { createApp, ref, reactive, computed, onMounted } = Vue;

// 创建应用
const app = createApp({
  setup() {
    // 响应式数据
    const currentView = ref('home');
    const globalLoading = ref(false);
    const searchKeyword = ref('');
    const showPublishRunner = ref(false);
    const showCart = ref(false);
    const showCheckout = ref(false);
    
    // 用户状态
    const user = reactive({
      isLoggedIn: false,
      username: '',
      nickname: '',
      createdAt: ''
    });
    
    // 表单数据
    const loginForm = reactive({
      username: '',
      password: ''
    });
    
    const registerForm = reactive({
      username: '',
      nickname: '',
      password: '',
      confirmPassword: ''
    });
    
    const runnerForm = reactive({
      title: '',
      description: '',
      reward: 10,
      deadline: ''
    });
    
    // 商家数据
    const merchants = ref([
      {
        id: 1,
        name: '肯德基宅急送（长青路店）',
        description: '美味炸鸡，快捷送达',
        address: '长青路88号',
        businessHours: '10:00-22:00',
        status: 1,
        rating: 4.8,
        deliveryFee: 6.00,
        minOrderAmount: 35.00
      },
      {
        id: 2,
        name: '霸王茶姬（云岗物美店）',
        description: '原叶鲜奶茶，活力轻果茶',
        address: '云岗物美超市1楼',
        businessHours: '09:00-21:00',
        status: 1,
        rating: 4.6,
        deliveryFee: 3.00,
        minOrderAmount: 20.00
      },
      {
        id: 3,
        name: '麦当劳（大学城店）',
        description: '经典汉堡，24小时营业',
        address: '大学城商业街12号',
        businessHours: '24小时',
        status: 1,
        rating: 4.5,
        deliveryFee: 5.00,
        minOrderAmount: 30.00
      },
      {
        id: 4,
        name: '星巴克咖啡（校园店）',
        description: '精品咖啡，舒适环境',
        address: '校园内文化广场',
        businessHours: '07:00-22:00',
        status: 0,
        rating: 4.7,
        deliveryFee: 8.00,
        minOrderAmount: 25.00
      }
    ]);
    
    const selectedMerchant = ref(null);
    
    // 菜单数据
    const merchantMenu = ref([
      {
        id: 1,
        name: '香辣鸡腿堡',
        description: '酥脆鸡腿肉配新鲜蔬菜',
        price: 18.50,
        image: './images/merchants/kfc-changqing/products/spicy-chicken.jpg'
      },
      {
        id: 2,
        name: '经典汉堡',
        description: '经典牛肉汉堡，口感丰富',
        price: 16.00,
        image: './images/merchants/kfc-changqing/products/classic-burger.jpg'
      },
      {
        id: 3,
        name: '薯条（大份）',
        description: '金黄酥脆，外酥内嫩',
        price: 12.00,
        image: './images/merchants/kfc-changqing/products/fries.jpg'
      },
      {
        id: 4,
        name: '可乐（中杯）',
        description: '冰爽可乐，解腻必备',
        price: 8.00,
        image: './images/merchants/kfc-changqing/products/cola.jpg'
      }
    ]);
    
    // 跑腿任务数据
    const runnerTasks = ref([
      {
        id: 1,
        title: '食堂代购午餐',
        description: '帮忙在二食堂买一份红烧肉套餐',
        reward: 5.00,
        deadline: '2025-12-17 12:00',
        status: 'pending'
      },
      {
        id: 2,
        title: '超市代购零食',
        description: '在校内超市买一些零食，清单已准备好',
        reward: 8.00,
        deadline: '2025-12-17 18:00',
        status: 'pending'
      }
    ]);
    
    // 购物车数据
    const cart = ref([]);
    
    // 订单数据
    const orders = ref([
      {
        id: 'ORD20251217001',
        merchantName: '肯德基宅急送（长青路店）',
        totalAmount: 45.50,
        status: 'completed',
        createdAt: '2025-12-16 12:30'
      },
      {
        id: 'ORD20251217002',
        merchantName: '霸王茶姬（云岗物美店）',
        totalAmount: 28.00,
        status: 'pending',
        createdAt: '2025-12-17 10:15'
      }
    ]);
    
    // 计算属性
    const popularMerchants = computed(() => {
      return merchants.value.filter(m => m.rating >= 4.5).slice(0, 2);
    });
    
    const filteredMerchants = computed(() => {
      if (!searchKeyword.value) {
        return merchants.value;
      }
      return merchants.value.filter(merchant => 
        merchant.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
        merchant.description.toLowerCase().includes(searchKeyword.value.toLowerCase())
      );
    });
    
    // 购物车计算属性
    const cartItemCount = computed(() => {
      return cart.value.reduce((total, item) => total + item.quantity, 0);
    });
    
    const cartTotal = computed(() => {
      return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
    });
    
    const orderTotal = computed(() => {
      if (!selectedMerchant.value) return 0;
      return cartTotal.value + selectedMerchant.value.deliveryFee;
    });
    
    // 方法
    const getMerchantLogo = (merchantId) => {
      const logoMap = {
        1: './images/merchants/kfc-changqing/logo/logo.jpg',
        2: './images/merchants/bawang-yungang/logo/logo.jpg'
      };
      return logoMap[merchantId] || './images/default/merchant-logo.jpg';
    };
    
    const viewMerchantDetail = (merchantId) => {
      selectedMerchant.value = merchants.value.find(m => m.id === merchantId);
      currentView.value = 'merchant-detail';
    };
    
    const filterMerchants = () => {
      // 搜索功能已通过计算属性实现
    };
    
    const addToCart = (item) => {
      const existingItem = cart.value.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.value.push({
          ...item,
          quantity: 1,
          merchantId: selectedMerchant.value.id,
          merchantName: selectedMerchant.value.name
        });
      }
      ElMessage.success(`已将 ${item.name} 加入购物车`);
    };
    
    const removeFromCart = (itemId) => {
      const index = cart.value.findIndex(item => item.id === itemId);
      if (index > -1) {
        cart.value.splice(index, 1);
        ElMessage.success('已从购物车移除');
      }
    };
    
    const updateCartQuantity = (itemId, quantity) => {
      const item = cart.value.find(cartItem => cartItem.id === itemId);
      if (item) {
        if (quantity <= 0) {
          removeFromCart(itemId);
        } else {
          item.quantity = quantity;
        }
      }
    };
    
    const clearCart = () => {
      cart.value = [];
    };
    
    const proceedToCheckout = () => {
      if (cart.value.length === 0) {
        ElMessage.warning('购物车为空');
        return;
      }
      if (!user.isLoggedIn) {
        ElMessage.warning('请先登录');
        currentView.value = 'login';
        return;
      }
      if (cartTotal.value < selectedMerchant.value.minOrderAmount) {
        ElMessage.warning(`最低起送金额为 ¥${selectedMerchant.value.minOrderAmount}`);
        return;
      }
      showCart.value = false;
      showCheckout.value = true;
    };
    
    const confirmOrder = () => {
      // 创建新订单
      const newOrder = {
        id: `ORD${Date.now()}`,
        merchantName: selectedMerchant.value.name,
        items: [...cart.value],
        totalAmount: orderTotal.value,
        status: 'pending',
        createdAt: new Date().toLocaleString('zh-CN')
      };
      
      orders.value.unshift(newOrder);
      clearCart();
      showCheckout.value = false;
      
      ElMessage.success('订单提交成功！');
      currentView.value = 'orders';
    };
    
    const acceptRunnerTask = (taskId) => {
      if (!user.isLoggedIn) {
        ElMessage.warning('请先登录');
        currentView.value = 'login';
        return;
      }
      
      const task = runnerTasks.value.find(t => t.id === taskId);
      if (task) {
        task.status = 'accepted';
        task.acceptedBy = user.nickname;
        ElMessage.success('接单成功！请及时完成任务');
      }
    };
    
    const handleLogin = () => {
      if (!loginForm.username || !loginForm.password) {
        ElMessage.error('请填写完整的登录信息');
        return;
      }
      
      // 模拟登录
      user.isLoggedIn = true;
      user.username = loginForm.username;
      user.nickname = loginForm.username;
      user.createdAt = '2025-12-17';
      
      // 保存到本地存储
      localStorage.setItem('user', JSON.stringify(user));
      
      ElMessage.success('登录成功');
      currentView.value = 'home';
      
      // 清空表单
      loginForm.username = '';
      loginForm.password = '';
    };
    
    const handleRegister = () => {
      if (!registerForm.username || !registerForm.nickname || !registerForm.password) {
        ElMessage.error('请填写完整的注册信息');
        return;
      }
      
      if (registerForm.password !== registerForm.confirmPassword) {
        ElMessage.error('两次输入的密码不一致');
        return;
      }
      
      // 模拟注册
      user.isLoggedIn = true;
      user.username = registerForm.username;
      user.nickname = registerForm.nickname;
      user.createdAt = '2025-12-17';
      
      // 保存到本地存储
      localStorage.setItem('user', JSON.stringify(user));
      
      ElMessage.success('注册成功');
      currentView.value = 'home';
      
      // 清空表单
      registerForm.username = '';
      registerForm.nickname = '';
      registerForm.password = '';
      registerForm.confirmPassword = '';
    };
    
    const handleLogout = () => {
      user.isLoggedIn = false;
      user.username = '';
      user.nickname = '';
      user.createdAt = '';
      
      // 清除本地存储
      localStorage.removeItem('user');
      
      ElMessage.success('已退出登录');
      currentView.value = 'home';
    };
    
    const publishRunnerTask = () => {
      if (!runnerForm.title || !runnerForm.description || !runnerForm.deadline) {
        ElMessage.error('请填写完整的任务信息');
        return;
      }
      
      if (!user.isLoggedIn) {
        ElMessage.error('请先登录');
        currentView.value = 'login';
        return;
      }
      
      // 添加新任务
      const newTask = {
        id: Date.now(),
        title: runnerForm.title,
        description: runnerForm.description,
        reward: runnerForm.reward,
        deadline: runnerForm.deadline,
        status: 'pending'
      };
      
      runnerTasks.value.unshift(newTask);
      
      ElMessage.success('跑腿任务发布成功');
      showPublishRunner.value = false;
      
      // 清空表单
      runnerForm.title = '';
      runnerForm.description = '';
      runnerForm.reward = 10;
      runnerForm.deadline = '';
    };
    
    const getTaskStatusText = (status) => {
      const statusMap = {
        pending: '待接单',
        accepted: '已接单',
        completed: '已完成',
        cancelled: '已取消'
      };
      return statusMap[status] || '未知状态';
    };
    
    const getOrderStatusText = (status) => {
      const statusMap = {
        pending: '待配送',
        delivering: '配送中',
        completed: '已完成',
        cancelled: '已取消'
      };
      return statusMap[status] || '未知状态';
    };
    
    // 初始化
    onMounted(() => {
      // 从本地存储恢复用户状态
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        Object.assign(user, userData);
      }
    });
    
    return {
      // 响应式数据
      currentView,
      globalLoading,
      searchKeyword,
      showPublishRunner,
      showCart,
      showCheckout,
      user,
      loginForm,
      registerForm,
      runnerForm,
      merchants,
      selectedMerchant,
      merchantMenu,
      runnerTasks,
      orders,
      cart,
      
      // 计算属性
      popularMerchants,
      filteredMerchants,
      cartItemCount,
      cartTotal,
      orderTotal,
      
      // 方法
      getMerchantLogo,
      viewMerchantDetail,
      filterMerchants,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      proceedToCheckout,
      confirmOrder,
      acceptRunnerTask,
      handleLogin,
      handleRegister,
      handleLogout,
      publishRunnerTask,
      getTaskStatusText,
      getOrderStatusText
    };
  }
});

// 使用 Element Plus
app.use(ElementPlus);

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 挂载应用
app.mount('#app');