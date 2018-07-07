// pages/travel/travel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    travel: {
      title: '广州旅游推荐',
      text: '一、先介绍一个最传统的广州西关游路线,从天河坐地铁前往陈家祠开始,全程除了吃和坐车还有第一站陈家祠可能要收门票外,其他都是免费参观观赏  头两天西关民俗游  安排如下:中山7路的陈家祠开始,陈家祠是典型的广州古书院,里面有精美的木刻石雕灰雕.这个景点可以逛2个小时到一个上午.  陈家祠出来后,走2站路就到泮塘,先看仁威庙(海不扬波),以前洋人的船队来广州也要来这里拜一下的,这个最多一个小时.  仁威庙南边就是今年春节才重开的 泮溪酒家,这个酒家的粤菜、园林风光、粤式点心都非常正宗好味道。如果陪同的人多，可以在那儿午饭+下午茶直落，如果只有2人建议还是提前订下午茶吧  泮溪酒家正好位于 西关古玩街口，这个也是一个充满艺术气氛的地方，带他们逛逛吧。时间约一个小时。  回到西关古玩街口接着下来带他从文昌北路往南走，这条路整条街都是（仿）古家私和石雕。到文昌南和上下九交界的地方，就是广州酒家，可以考虑在这里晚饭，不过1楼是广州酒家分租出去的，去2楼点菜更好。  上下九的夜景还过的去，不过接着下九路的恩宁路更好（建议第2天前往更好），更多老铺，其中恩宁路有家 “广东八和会馆”是广州剩余不多专门的唱粤剧的地方，他爱好音乐可能会在这里找到共鸣。  上下九一带已经很接近珠江了,顺人民南再往南一点点就是珠江了,可以安排先去南方大厦附近沙面岛(坐车的话这里站名是六二三路),这里整个小岛充满西欧风情,很多上百年的参天大榕树,建筑都是上百多年历史的西式哥特式领事馆建筑,还有很多充满风情的咖啡馆西餐厅和几家很有特色的小教堂  到晚上可以在珠江边逛下看下珠江夜景,珠江夜游也是不可以错过的旅游项目  在上下九顺人民南走,东南方几百米是一德路,一德路本身一条路都是食品和玩具批发,但路中心有石室圣心大教堂,规模宏伟建筑精美,可以和巴黎圣母院媲美,不可错过(参观免费)  二推荐下广州新潮购物游，全程地铁1号线贯穿，不用坐其他交通工具很方便的  从东往西。，坐地铁1号线  1、从广州火车东站出发，先在体育西路下车，就到天河城、正佳广场一带，这里名牌时装化妆品JUSCO日本超市香港百佳超市集中地，可以逛一下  2、然后继续1号线往西坐到东山口下车，走出来一点点就是农林下路步行街，也有很多流行品牌店铺，当然还有北方名牌货物集中地王府井百货大厦、东山口出来的东山百货大厦也是广州本地老百货了。  3、然后继续1号线往西坐到烈士陵园站，则是流行前线地下商场这个很多年轻人喜欢时尚店铺性价比高，潮女和帅哥都爱逛的，对面是中华广场则类似天河城广场  4、然后继续1号线往西坐到公园前站，这里就是市中心的中心，北京路步行街就在这里，要好好逛下哦，当然公园前的对面的动漫星城是类似流行前线也不可错过，还有五月花广场  5、然后继续1号线往西坐到长寿西地铁站出站，这里是恒宝华庭也类似天河城，规模小些，出站后往南走10分钟，就是当然主要推荐是上下九步行街，不可错过，这里的东西新潮便宜。好吃的都传统小吃都集中在上下九范围1公里内了,上下九为中心,很多开很多年小吃店,伍湛记吃粥,宝华面店和坚记吃面,银记吃拉肠,还有很多糖水店冰室吃甜品...还要严重推荐推饮早茶,最有名的几个地方,上下九的陶陶居(康有为帮他们起的名字),广州酒家,有钱的话可以去珠江边沙面的白天鹅,今年刚刚重新开张的泮塘的泮溪酒家,这些都是传统有名老茶楼了,点心精致而且是典型粤式茶点,好棒的!  6、最后上下九从西往东逛，一直到人民路那的时候顺人民路往南走200米，看到马路对面的状元坊，这个是广州潮流货的始发地之一，又叫撞人坊，学生MM白领姐姐聚集地，这里东西新潮但很便宜（所以小心质量，人太多小心钱包。。。）  祝你旅途愉快！  三、最后推荐上下九方圆1公里内的美食  应该是上下九方圆2公里内,如果只是上下九就太少了  上下九本身的话,1、上九路（靠近人民路大概200米吧）有银记拉肠，连香港蔡澜都推荐（不过我觉得另外一家更好，后面推荐）  2、继续往西走到下九路和文昌路交界是广州酒家，广州酒家喝茶不错，广州喝茶的意思就是吃各种点心，不过广州酒家的点心有点偏贵（相对其他西关茶楼）  文昌北路有家老云吞店，叫婆婆面的，很长时间历史了，味道也还可以，标志就是门口有个老婆婆在包云吞的，价格便宜味道也还可以。  3下九路再往西就是第10圃转向北边是宝华路，快到恒宝华庭大厦那是宝华面店，这个是典型广州口味的面条，炸酱阔面很不错的  4然后恒宝华庭大厦旁边的多宝路往前走大概500米到广医3院那里对面有家友联肠粉只开早上到下午2点，那的拉肠比银记还好。  接着推荐上下九为中心,很多开很多年小吃店,龙津路伍湛记吃粥,宝华路宝华面店和长寿东路坚记吃面,上九路或者文昌路银记吃拉肠,文昌路的婆婆面云吞，只在上午卖的龙津路的狮坑牛腩粉，多宝路市2医院对面的新联拉肠（也只卖上午半天），大新路搬海珠南路的林记吃油香饼，林师傅牛杂，还有很多糖水店冰室吃甜品...'
    }
  }
})