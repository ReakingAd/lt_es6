function setAirData(observe24h_data) {
    function getNewestData(a) {
        for (var t = a, b = t.length - 1; "" == t[b] && b > 0; )
            --b;
        return t[b]
    }
    function isEmpty(a) {
        return a.length == dataLen
    }
    var BHtml1 = '<div class="l"><div class="aqi"><em></em> <i></i></div><ul><li class="li1 clearfix"><span>主要污染物</span> <i>PM10</i> <i>PM2.5</i> <i>CO</i> <i>NO2</i> <i>SO2</i></li><li class="li2 clearfix"><span>浓度μg/m3<br>CO为mg/m3</span> <i class="pm10"></i> <i class="pm25"></i> <i class="co"></i> <i class="no2"></i> <i class="so2"></i></li></ul><div class="txt"><h2>温馨提示</h2><span></span></div></div><div class="r"><div id="weatherChart"></div></div><div class="nullboard"></div>';
    $(".airBot").html(BHtml1);
    var $D = $(".airVal")
      , $Dl = $D.find(".l")
      , dataAQI = null
      , $aqiCB = $("#aqiCB");
    if (observe24h_data.station.length > 5) {
        $D.find(".city").text(observe24h_data.name),
        $aqiCB.find(".t11").find("span").text(observe24h_data.name).attr("data-cid", observe24h_data.station);
        var defaultCity = $_cookie("weather_defaultCity");
        defaultCity ? $aqiCB.find(".t12").show().find("span").text(defaultCity.split("|")[1]).attr("data-cid", defaultCity.split("|")[0]) : $aqiCB.find(".t12").hide()
    }
    for (var obsData = observe24h_data.data, i = obsData.length - 1; i >= 0; i--)
        if (obsData[i] && obsData[i].t1) {
            dataAQI = obsData[i];
            break
        }
    if (!dataAQI)
        return $(".nullboard").show(),
        void 0;
    $(".nullboard").hide();
    var BHtml2 = '<div class="tabs"><h2>整点天气实况监测</h2><p id="currHour"></p><p class="second"><i id="detailHour"></i></p><ul><li class="aqi_on on" data-role="air">空气质量</li><li class="p2" data-role="pm2">PM2.5</li><li class="p10" data-role="pm10">PM10</li><li class="sd" data-role="humidity">相对湿度</li><li class="js" data-role="rain">降水量</li><li class="fl" data-role="wind">风力风向</li></ul></div><div class="chart"><div id="hourHolder"><div class="xLabel"></div><div class="yLabel"></div><div class="result"></div><div class="showData"></div></div><em>(h)</em><i id="wd"></i> <i id="pm2">(μg/m³)</i> <i id="pm10">(μg/m³)</i> <i id="sd">(%)</i> <i id="js">(mm)</i> <i id="fl">(级)</i><p class="air detail">空气质量指数：简称AQI，是定量描述空气质量状况的无量纲指数。（数据由国家环保部提供）</p><p class="humidity">气象观测方法-湿度：空气湿度是表示空气中水汽含量和湿润程... <a target="_blank" href="http://baike.weather.com.cn/index.php?doc-view-1261.php">更多&gt;&gt;</a></p><p class="pm2">PM2.5:PM2.5是指大气中直径小于或等于2.5微米的颗粒物...（数据由国家环保部提供） <a target="_blank" href="http://baike.weather.com.cn/index.php?doc-view-3118.php">更多&gt;&gt;</a></p><p class="pm10">PM10：直径小于等于10微米的可吸入颗粒物被称为PM10...（数据由国家环保部提供）<a target="_blank" href="http://baike.weather.com.cn/index.php?doc-view-3104.php">更多&gt;&gt;</a></p><p class="rain">什么是降水量？：从天空降落到地面上的液态或固态（经融化后）水... <a target="_blank" href="http://baike.weather.com.cn/index.php?doc-view-425.php">更多&gt;&gt;</a></p><p class="wind">气象观测方法-风：风是空气的水平运动，是一个用方向（风向）... <a target="_blank" href="http://baike.weather.com.cn/index.php?doc-view-1262.php">更多&gt;&gt;</a></p><div class="aqiColorExp clearfix"><span class="span1">优</span> <span class="span2">良</span> <span class="span3">轻度</span> <span class="span4">中度</span> <span class="span5">重度</span> <span class="span6">严重</span></div>';
    $("#weatherChart").html(BHtml2);
    var bgZS = parseInt(dataAQI.t1);
    if (5 >= bgZS)
        var bgZS = 0;
    else if (200 >= bgZS)
        var bgZS = 10 * parseInt((bgZS + 5) / 10);
    else if (300 >= bgZS)
        var bgZS = 20 * parseInt((bgZS + 10) / 20);
    else if (500 >= bgZS)
        var bgZS = 40 * parseInt((bgZS + 20) / 40);
    else
        var bgZS = 500;
    var bgImg = "url(http://i.tq121.com.cn/i/air/zishu_" + bgZS + ".jpg)"
      , levelNum = dataAQI.t1 <= 50 && "0" || dataAQI.t1 <= 100 && 1 || dataAQI.t1 <= 150 && 2 || dataAQI.t1 <= 200 && 3 || dataAQI.t1 <= 300 && 4 || dataAQI.t1 > 300 && 5 || 0
      , arrExp = ["优", "良", "轻度污染", "中度污染", "重度污染", "严重污染"]
      , arrCol = ["9dca80", "f7da64", "f29e39", "da555d", "b9377a", "881326"]
      , arrTxt = ["空气很好，可以外出活动，呼吸新鲜空气，拥抱大自然！", "空气好，可以外出活动，除极少数对污染物特别敏感的人群以外，对公众没有危害！", "空气一般，老人、小孩及对污染物比较敏感的人群会感到些微不适！", "空气较差，老人、小孩及对污染物比较敏感的人群会感到不适！", "空气差，适当减少外出活动，老人、小孩出门时需做好防范措施！", "空气很差，尽量不要外出活动!"];
    if ($Dl.find(".aqi").css({
        "background-image": bgImg,
        color: "#" + arrCol[levelNum]
    }).find("em").text(dataAQI.t1).next().text(arrExp[levelNum]),
    "" == dataAQI.t4 ? $Dl.find(".pm10").text("　") : $Dl.find(".pm10").text(dataAQI.t4),
    $Dl.find(".pm25").text(dataAQI.t3),
    $Dl.find(".co").text(dataAQI.t5),
    $Dl.find(".no2").text(dataAQI.t6),
    $Dl.find(".so2").text(dataAQI.t9),
    $Dl.find(".txt").children("span").text(arrTxt[levelNum]),
    observe24h_data.station.length > 5) {
        var alarmUrl = "http://d1.weather.com.cn/dingzhi/_id_.html"
          , proId = observe24h_data.station.substring(0, 5);
        "10128" == proId || $.getScript("http://d1.weather.com.cn/dingzhi/" + observe24h_data.station + ".html", function() {
            var arr = eval("alarmDZ" + observe24h_data.station).w
              , l = arr.length;
            l > 0 ? $D.find(".alarm").empty().append('<i></i><a target="_blank" href="http://www.weather.com.cn/alarm/newalarmlist.shtml?areaId=' + observe24h_data.station + '">' + l + "预警中</a>") : $D.find(".alarm").empty()
        }),
        $share = $D.find(".share");
        var share_txt = "【" + observe24h_data.name + "空气质量】 AQI：" + dataAQI.t1 + "；PM2.5：" + dataAQI.t3 + "，" + arrTxt[levelNum] + "（分享自 @中国天气）";
        $share.children("a.sina").attr("href", "http://service.weibo.com/share/share.php?url=http://weather.com.cn/air/&title=" + share_txt),
        $share.children("a.tqq").attr("href", "http://share.v.t.qq.com/index.php?c=share&a=index&url=http%3A%2F%2Fweather.com.cn%2Fair%2F&title=" + share_txt),
        $share.children("a.neteasemb").attr("href", "http://www.lofter.com/")
    }
    Raphael.fn.drawGrid = function(a, t, b, i, e, s) {
        s = s || "#000";
        for (var r = ["M", Math.round(a) + .5, Math.round(t) + .5, "L", Math.round(a + b) + .5, Math.round(t) + .5], c = i / e, d = 1; e >= d; d++)
            r = r.concat(["M", Math.round(a) + .5, Math.round(t + d * c) + .5, "H", Math.round(a + b) + .5]);
        return this.path(r.join(",")).attr({
            stroke: s,
            fill: "#fff"
        })
    }
    ,
    Raphael.fn.polygon = function(a, t, b) {
        var i = ["M", a, t, "L", a - b * Math.sin(15), t + Math.sin(15) * b * Math.sqrt(3), a, t - 2 * b * Math.sin(15), a + b * Math.sin(15), t + Math.sin(15) * b * Math.sqrt(3), "z"];
        return this.path(i.join(","))
    }
    ;
    var rowNum = 6
      , paper = null
      , isInvalid = function(a, t) {
        return "" == a || "null" == a || t && 0 == a
    }
      , adjustData = {
        length: 0,
        date: [],
        air: [],
        pm2: [],
        pm10: [],
        humidity: [],
        rain: [],
        rainSum: 0,
        windLevel: [],
        windAngle: [],
        windDirection: [],
        flagData: {
            air: {
                max: 0,
                min: 0
            },
            pm2: {
                max: 0,
                min: 0
            },
            pm10: {
                max: 0,
                min: 0
            },
            humidity: {
                max: 0,
                min: 0
            },
            rain: {
                max: 0,
                min: 0
            },
            wind: {
                max: 0,
                min: 0
            }
        },
        min: {
            air: 0,
            pm2: 0,
            pm10: 0,
            humidity: 0,
            rain: 0,
            wind: 0
        },
        max: {
            air: 0,
            pm2: 0,
            pm10: 0,
            humidity: 0,
            rain: 0,
            wind: 12
        },
        step: {
            air: 0,
            pm2: 1,
            pm10: 1,
            humidity: 1,
            rain: 1,
            wind: 2
        },
        invalid: {
            air: [],
            pm2: [],
            pm10: [],
            humidity: [],
            rain: [],
            wind: []
        },
        init: function(a) {
            this.length = a.data.length,
            this.length;
            for (var t = 0; t < this.length; t++) {
                var b = a.data[t];
                this.date.push(b.time),
                isInvalid(b.t1) && this.invalid.air.push(t),
                this.air.push(b.t1),
                isInvalid(b.t3) && this.invalid.pm2.push(t),
                this.pm2.push(b.t3),
                isInvalid(b.t4) && this.invalid.pm10.push(t),
                this.pm10.push(b.t4),
                isInvalid(b.t12) && this.invalid.humidity.push(t),
                this.humidity.push(b.t12),
                isInvalid(b.t13) && this.invalid.rain.push(t),
                this.rain.push(b.t13),
                isInvalid(b.t11, !0) && this.invalid.wind.push(t),
                this.windLevel.push(b.t11),
                this.windAngle.push(b.t10),
                this.windDirection.push(b.t14),
                this.rainSum += parseFloat(b.t13) || 0
            }
            var i = function(a, t) {
                var b = [];
                return $.each(a, function(i, e) {
                    isNaN(e) ? (b.push(t),
                    a[i] = "") : b.push(e)
                }),
                b
            }
              , e = adjustData.max
              , s = adjustData.min
              , r = function(a) {
                return Math.min.apply(Math, a)
            }
              , c = function(a) {
                return Math.max.apply(Math, a)
            }
              , d = function(a) {
                return Math.floor(a)
            }
              , h = function(a) {
                return Math.ceil(a)
            }
              , n = adjustData.flagData;
            n.air.min = r(i(adjustData.air, s.air)),
            n.air.max = c(i(adjustData.air, e.air)),
            n.pm2.min = r(i(adjustData.pm2, s.pm2)),
            n.pm2.max = c(i(adjustData.pm2, e.pm2)),
            n.pm10.min = r(i(adjustData.pm10, s.pm10)),
            n.pm10.max = c(i(adjustData.pm10, e.pm10)),
            n.rain.min = r(i(adjustData.rain, s.rain)),
            n.rain.max = c(i(adjustData.rain, e.rain)),
            n.humidity.min = r(i(adjustData.humidity, s.humidity)),
            n.humidity.max = c(i(adjustData.humidity, e.humidity)),
            n.wind.min = r(i(adjustData.windLevel, s.wind)),
            n.wind.max = c(i(adjustData.windLevel, e.wind)),
            adjustData.min.air = d(adjustData.flagData.air.min),
            adjustData.min.pm2 = d(adjustData.flagData.pm2.min),
            adjustData.min.pm10 = d(adjustData.flagData.pm10.min),
            adjustData.min.rain = d(adjustData.flagData.rain.min),
            adjustData.min.humidity = d(adjustData.flagData.humidity.min),
            adjustData.max.air = d(adjustData.flagData.air.max),
            adjustData.max.pm2 = d(adjustData.flagData.pm2.max),
            adjustData.max.pm10 = d(adjustData.flagData.pm10.max),
            adjustData.max.rain = h(adjustData.flagData.rain.max),
            adjustData.max.humidity = h(adjustData.flagData.humidity.max),
            adjustData.min.air = adjustData.min.air - adjustData.step.air,
            adjustData.min.humidity - adjustData.step.humidity >= 0 && (adjustData.min.humidity -= adjustData.step.humidity),
            adjustData.min.rain - adjustData.step.rain >= 0 && (adjustData.min.rain -= adjustData.step.rain),
            adjustData.min.pm2 - adjustData.step.pm2 >= 0 && (adjustData.min.pm2 -= adjustData.step.pm2),
            adjustData.min.pm10 - adjustData.step.pm10 >= 0 && (adjustData.min.pm10 -= adjustData.step.pm10),
            (adjustData.max.air - adjustData.min.air) / rowNum > adjustData.step.air && (adjustData.step.air = h((adjustData.max.air - adjustData.min.air) / rowNum)),
            (adjustData.max.humidity - adjustData.min.humidity) / rowNum > adjustData.step.humidity && (adjustData.step.humidity = h((adjustData.max.humidity - adjustData.min.humidity) / rowNum)),
            (adjustData.max.rain - adjustData.min.rain) / rowNum > adjustData.step.rain && (adjustData.step.rain = h((adjustData.max.rain - adjustData.min.rain) / rowNum)),
            (adjustData.max.pm2 - adjustData.min.pm2) / rowNum > adjustData.step.pm2 && (adjustData.step.pm2 = h((adjustData.max.pm2 - adjustData.min.pm2) / rowNum)),
            (adjustData.max.pm10 - adjustData.min.pm10) / rowNum > adjustData.step.pm10 && (adjustData.step.pm10 = h((adjustData.max.pm10 - adjustData.min.pm10) / rowNum)),
            adjustData.max.air = adjustData.min.air + adjustData.step.air * rowNum,
            adjustData.max.humidity = adjustData.min.humidity + adjustData.step.humidity * rowNum,
            adjustData.max.pm2 = adjustData.min.pm2 + adjustData.step.pm2 * rowNum,
            adjustData.max.pm10 = adjustData.min.pm10 + adjustData.step.pm10 * rowNum,
            adjustData.max.humidity > 100 && (adjustData.max.humidity = 100,
            adjustData.min.humidity = adjustData.max.humidity - adjustData.step.humidity * rowNum),
            adjustData.max.rain = adjustData.min.rain + adjustData.step.rain * rowNum
        }
    };
    adjustData.init(observe24h_data);
    var observe24hGraph = {
        width: 0,
        height: 0,
        leftgutter: 0,
        bottomgutter: 0,
        topgutter: 0,
        rightgutter: 0,
        rowNum: 0,
        colNum: 0,
        cellHeight: 0,
        cellWidth: 0,
        grid: null ,
        rects: null ,
        shap: null ,
        path: null ,
        pathStyle: {
            stroke: "#94c05a",
            "stroke-width": 2,
            "stroke-linejoin": "round"
        },
        init: function(a) {
            var t = [];
            this.width = a.width,
            this.height = a.height,
            this.leftgutter = a.leftgutter,
            this.bottomgutter = a.bottomgutter,
            this.topgutter = a.topgutter,
            this.rightgutter = a.rightgutter,
            this.rowNum = a.rowNum,
            this.colNum = a.colNum,
            this.cellHeight = (this.height - this.topgutter - this.bottomgutter) / this.rowNum,
            this.cellWidth = (this.width - this.leftgutter - this.rightgutter) / this.colNum,
            paper = Raphael(a.container, observe24hGraph.width, observe24hGraph.height),
            this.grid = paper.drawGrid(observe24hGraph.leftgutter, observe24hGraph.topgutter, observe24hGraph.width - observe24hGraph.leftgutter - observe24hGraph.rightgutter, observe24hGraph.height - observe24hGraph.topgutter - observe24hGraph.bottomgutter, observe24hGraph.rowNum, "#eee"),
            this.rects = paper.set(),
            this.shap = paper.set();
            for (var b = 0, i = this.colNum; i > b; b++)
                observe24hGraph.rects.push(paper.rect(observe24hGraph.leftgutter + observe24hGraph.cellWidth * b, observe24hGraph.topgutter, observe24hGraph.cellWidth, observe24hGraph.height - observe24hGraph.bottomgutter - observe24hGraph.topgutter).attr({
                    stroke: "none",
                    fill: "#fff",
                    opacity: 0
                })),
                t.push("<span>" + a.date[b] + "</span>");
            $(".xLabel").html(t.join(""))
        },
        drawGraph: function(a) {
            for (var t = [], b = a.step, i = a.unit, e = a.max, s = a.min, r = this.cellWidth, c = this.cellHeight, d = this.topgutter, h = this.leftgutter, n = this.height - d - this.bottomgutter, o = 0; o <= this.rowNum; o++)
                t.unshift("<span>" + (s + o * b) + "</span>");
            if ($(a.container).html(t.join("")),
            a.data.length != a.invalid.length) {
                var h = this.leftgutter
                  , r = this.cellWidth
                  , u = a.r || 0
                  , p = this.height - this.bottomgutter
                  , l = $(a.dataContainer);
                switch (a.shap) {
                case "rect":
                    for (var m = [], o = 0, v = this.colNum; v > o; o++) {
                        var f, D = Math.round(h + r * (o + .5)) + .5, g = Math.round(c * ((e - a.data[o]) / b) + d), w = "#fff";
                        "" == i ? f = a.data[o] <= 50 ? "#9dca80" : a.data[o] <= 100 ? "#f7da64" : a.data[o] <= 150 ? "#f29e39" : a.data[o] <= 200 ? "#da555d" : a.data[o] <= 300 ? "#b9377a" : "#881326" : a.data[o] < 10 ? f = "#6600CC" : a.data[o] >= 10 && a.data[o] <= 25 ? f = "#0000FF" : a.data[o] > 25 && a.data[o] <= 50 ? f = "#008000" : a.data[o] > 50 && a.data[o] <= 100 ? f = "#FFCC00" : a.data[o] > 100 && a.data[o] <= 250 ? f = "#FF6600" : a.data[o] > 250 && (f = "#FF0000"),
                        w && f && m.push({
                            stroke: w,
                            "stroke-width": 1,
                            fill: f
                        }),
                        this.shap.push(paper.rect(D - .5 * r + 4, p, 13, 0).attr(m[o])),
                        this.shap[o].animate({
                            height: n - g + d,
                            transform: ["t0," + (-p + g)]
                        }, 500),
                        function(a, t, b, e) {
                            if ("" != e && 0 != e) {
                                var s = function() {
                                    observe24hGraph.shap[a].attr({
                                        fill: "#076ea8"
                                    }),
                                    "" == i ? l.html(e + i) : l.html(e + i);
                                    var s = l.width()
                                      , r = t + 10;
                                    s + t > 660 && (r = t - s - 20),
                                    l.css({
                                        top: b,
                                        left: r - 2
                                    }).show()
                                }
                                  , r = function() {
                                    observe24hGraph.shap[a].attr(m[a]),
                                    l.hide()
                                };
                                observe24hGraph.rects[a].hover(s, r),
                                observe24hGraph.shap[a].hover(s, r)
                            }
                        }(o, D, g, a.data[o])
                    }
                    break;
                default:
                    var j = []
                      , x = paper.path().attr({
                        stroke: "#076ea8",
                        "stroke-width": 1
                    })
                      , y = a.invalid.length + 1
                      , _ = new Array(y)
                      , C = new Array(y)
                      , k = 0;
                    this.path = new Array(y);
                    for (var o = 0, v = this.colNum; v > o; o++) {
                        var D = Math.round(h + r * (o + .5)) + .5
                          , g = Math.round(c * ((e - a.data[o]) / b) + d)
                          , N = Math.round(c * ((e - s) / b) + d);
                        if ("" == a.data[o])
                            k++;
                        else if ((0 == o || "" == a.data[o - 1]) && (C[k] = ["M", D, g, "L", D, g],
                        _[k] = ["M", D, N, "L", D, N]),
                        0 != o && "" != a.data[o + 1] && "" != a.data[o - 1]) {
                            var M = Math.round(c * (e - a.data[o - 1]) / b + d)
                              , G = Math.round(h + r * (o - .5))
                              , I = Math.round(c * (e - a.data[o + 1]) / b + d)
                              , S = Math.round(h + r * (o + 1.5));
                            C[k] = C[k].concat(G, M, D, g, S, I),
                            _[k] = _[k].concat(G, N, D, N, S, N)
                        }
                        if ("dot" == a.shap) {
                            var A;
                            "μg/m³" == i || "" == i ? A = a.data[o] <= 50 ? "#6ac6ce" : a.data[o] <= 100 ? "#78ba60" : a.data[o] <= 150 ? "#f4b212" : a.data[o] <= 200 ? "#e24e31" : a.data[o] <= 300 ? "#ce1c5b" : "#880b20" : a.data[o] < 26 ? A = "#FF0000" : a.data[o] >= 26 && a.data[o] <= 51 ? A = "#FF6600" : a.data[o] > 51 && a.data[o] <= 75 ? A = "#008000" : a.data[o] > 75 && (A = "#6600CC"),
                            A && j.push({
                                fill: A,
                                stroke: A,
                                "stroke-width": 1
                            }),
                            this.shap.push(paper.circle(D, p, u).attr(j[o]))
                        } else
                            0 == o && j.push({
                                fill: "#6600CC",
                                stroke: "#6600CC",
                                "stroke-width": 1
                            }),
                            this.shap.push(paper.polygon(D, p, u).attr(j[0]));
                        "" == a.data[o] && this.shap[o].hide(),
                        "dot" == a.shap ? this.shap[o].animate({
                            cy: g
                        }, 500).attr({
                            cy: g
                        }) : this.shap[o].animate({
                            transform: ["t0," + (-p + g) + "r" + (a.angle[o] - 180)]
                        }, 500),
                        function(t, b, e, s, r) {
                            var c = function() {
                                x.attr({
                                    path: ["M", b, 0, "V", observe24hGraph.height - 25, "M", 10, e + .5, "H", observe24hGraph.width]
                                }).show(),
                                l.html(r + s + i);
                                var a = l.width()
                                  , t = b + 10;
                                a + b > 660 && (t = b - a - 20),
                                l.css({
                                    top: e,
                                    left: t
                                }).show()
                            }
                              , d = function() {
                                x.hide(),
                                $(a.dataContainer).hide()
                            };
                            "" != s && observe24hGraph.rects[t].hover(c, d),
                            observe24hGraph.shap[t].hover(c, d)
                        }(o, D, g, a.data[o], a.desc && a.desc[o] || "")
                    }
                    for (var q = 0; y > q; q++)
                        _[q] && (this.path[q] = paper.path(_[q]),
                        this.path[q].attr(this.pathStyle).hide(),
                        this.path[q].animate({
                            path: C[q]
                        }, 470).show());
                    for (var Q = 0, L = this.colNum; L > Q; Q++)
                        this.shap[Q] && this.shap[Q].toFront()
                }
            }
        }
    }
      , dataConf = {
        width: 574,
        height: 270,
        leftgutter: 42,
        bottomgutter: 40,
        topgutter: 10,
        rightgutter: 10,
        rowNum: rowNum,
        colNum: adjustData.length,
        container: "hourHolder",
        date: adjustData.date
    }
      , graphConf = {
        shap: "rect",
        container: ".yLabel",
        dataContainer: ".showData",
        min: adjustData.min.air,
        max: adjustData.max.air,
        data: adjustData.air,
        unit: "",
        invalid: adjustData.invalid.air,
        step: adjustData.step.air,
        r: 4
    };
    observe24hGraph.init(dataConf),
    observe24hGraph.drawGraph(graphConf);
    var dataLen = adjustData.length;
    $("#platform").html(5 == observe24h_data.station.length && $(".airQuality .find_air .form:eq(1) p").text() + "_" + observe24h_data.name || observe24h_data.name);
    var $currHour = $("#currHour")
      , $detailHour = $("#detailHour")
      , $result = $("#hourHolder .result")
      , newTemperature = getNewestData(adjustData.air);
    if ($("#weatherChart .tabs ul li").hover(function() {
        var a = $(this).attr("class");
        a.length > 3 || $(this).attr("class", $(this).attr("data-role") + " " + a)
    }, function() {
        $(this).removeClass($(this).attr("data-role"))
    }).click(function() {
        var a = $(".aqiColorExp");
        if (!$(this).hasClass("on")) {
            var t = $(this).siblings(".on")
              , b = $(this).attr("data-role");
            t.attr("data-role"),
            t.attr("class", t.attr("class").replace("_on", "")).removeClass("on"),
            $(this).attr("class", $(this).attr("class") + "_on").addClass("on"),
            $result.hide();
            var i, e = adjustData.invalid;
            switch (b) {
            case "humidity":
                $("i#sd").show().siblings("i").hide(),
                a.hide(),
                i = $.extend({}, graphConf, {
                    shap: "dot",
                    min: adjustData.min.humidity,
                    max: adjustData.max.humidity,
                    data: adjustData.humidity,
                    unit: "%",
                    invalid: e.humidity,
                    step: adjustData.step.humidity
                });
                break;
            case "pm2":
                $("i#pm2").show().siblings("i").hide(),
                a.show(),
                i = $.extend({}, graphConf, {
                    shap: "dot",
                    min: adjustData.min.pm2,
                    max: adjustData.max.pm2,
                    data: adjustData.pm2,
                    unit: "μg/m³",
                    invalid: e.pm2,
                    step: adjustData.step.pm2
                });
                break;
            case "pm10":
                $("i#pm10").show().siblings("i").hide(),
                a.show(),
                i = $.extend({}, graphConf, {
                    shap: "dot",
                    min: adjustData.min.pm10,
                    max: adjustData.max.pm10,
                    data: adjustData.pm10,
                    unit: "μg/m³",
                    invalid: e.pm10,
                    step: adjustData.step.pm10
                });
                break;
            case "air":
                $("i#wd").show().siblings("i").hide(),
                getNewestData(adjustData.air),
                a.show();
                break;
            case "rain":
                $("i#js").show().siblings("i").hide(),
                getNewestData(adjustData.rain);
                var s = adjustData.rainSum;
                (isNaN(s) || 0 == s || isEmpty(e.rain)) && $result.html("24小时内无降水数据").show(),
                a.hide(),
                i = $.extend({}, graphConf, {
                    min: adjustData.min.rain,
                    max: adjustData.max.rain,
                    data: adjustData.rain,
                    unit: "mm",
                    step: adjustData.step.rain,
                    invalid: e.rain
                });
                break;
            case "wind":
                $("i#fl").show().siblings("i").hide(),
                a.hide(),
                i = $.extend({}, graphConf, {
                    shap: "polygon",
                    min: adjustData.min.wind,
                    max: adjustData.max.wind,
                    data: adjustData.windLevel,
                    angle: adjustData.windAngle,
                    direction: adjustData.windDirection,
                    desc: adjustData.windDirection,
                    unit: "级",
                    invalid: e.wind,
                    step: adjustData.step.wind,
                    r: 8
                })
            }
            paper.remove(),
            observe24hGraph.init(dataConf),
            observe24hGraph.drawGraph(i || graphConf),
            $("#weatherChart .chart .detail").removeClass("detail"),
            $("#weatherChart .chart").find("." + b).addClass("detail")
        }
    }),
    observe24h_data.station.length > 5) {
        var cc = $_cookie("weather_browseCity") || "";
        if (cc) {
            var arr_cc = cc.split(",")
              , isLooked = 0;
            if ($.each(arr_cc, function(a, t) {
                t.split("|")[0] == observe24h_data.station && (isLooked = 1)
            }),
            !isLooked)
                var cc = observe24h_data.station + "|" + observe24h_data.name + "," + arr_cc.slice(0, 3).join(",")
        } else
            var cc = observe24h_data.station + "|" + observe24h_data.name;
        $_cookie("weather_browseCity", cc, {
            expires: 999
        });
        var browseCity = $_cookie("weather_browseCity")
          , $aqiCB_t3 = $aqiCB.find(".t3");
        if (browseCity) {
            var strRecVisit = "<i>最近访问：</i>";
            $.each(browseCity.split(","), function(a, t) {
                strRecVisit += '<span data-cid="' + t.split("|")[0] + '">' + t.split("|")[1] + "</span>"
            }),
            $aqiCB_t3.empty().append(strRecVisit)
        }
    }
}
define(function(require) {
    function a() {
        this.init = function() {
            function a(a) {
                var t = new RegExp("(^|&)" + a + "=([^&]*)(&|$)","i")
                  , b = window.location.search.substr(1).match(t);
                return null != b ? unescape(b[2]) : null
            }
            function i(a) {
                d.find("span").text("选择观测点");
                var t = '<li class="ND"><a href="javascript:;">选择观测点</a></li>';
                $.each(a, function(a, b) {
                    t += '<li><a href="javascript:;" data-id="' + a + '">' + b.b1 + "</a></li>"
                }),
                c.empty().append(t)
            }
            var e = $(".airVal")
              , s = $("#aqiCB");
            s.find(".b");
            var r = $("#List")
              , c = r.find("ul");
            e.find("h1").click(function() {
                s.show().stop(!0, !0).animate({
                    right: "0px"
                }, "slow")
            }),
            s.find("h1").children("i").click(function() {
                s.stop(!0, !0).animate({
                    right: "-910px"
                }, "slow", function() {
                    s.hide()
                })
            }),
            s.find("[data-cid]").live("click", function() {
                var a = $(this).attr("data-cid")
                  , e = a.substr(0, 7)
                  , r = e.substr(0, 5)
                  , c = b[r] && b[r].t2[e] && b[r].t2[e].c2 || [];
                i(c),
                7 == a.length && (a = 1010101 == e || 1010201 == e || 1010301 == e || 1010401 == e ? e + "00" : e + "01"),
                s.animate({
                    right: "-910px"
                }, "slow", function() {
                    s.hide()
                });
                var d = t.replace("_id_", a);
                $.getScript(d)
            });
            var d = e.find(".checkon").click(function() {
                r.show()
            });
            r.hover(function() {
                $(this).show()
            }, function() {
                $(this).hide()
            });
            var h = $(".nullboard");
            c.find('li:not(".ND")').find("a").live("click", function() {
                d.find("span").text($(this).text()),
                r.hide(),
                h.hide();
                var a = t.replace("_id_", $(this).attr("data-id"));
                $.getScript(a)
            });
            var n = s.find(".t1")
              , o = n.find(".t12")
              , u = n.find(".set").click(function() {
                var a = $(this).hide().prev();
                o.show();
                var t = a.text()
                  , b = a.attr("data-cid");
                $_cookie("weather_defaultCity", b + "|" + t, {
                    expires: 999
                }),
                o.show().find("span").text(t).attr("data-cid", b)
            });
            n.find(".delete").click(function() {
                o.hide(),
                u.show(),
                $_cookie("weather_defaultCity", null )
            });
            var p = a("city");
            if (p && /\d{9}/.test(p)) {
                var l = p
                  , m = l.toString().substr(0, 5)
                  , v = l.toString().substr(0, 7)
                  , f = b[m] && b[m].t2[v] && b[m].t2[v].c2 || [];
                i(f);
                var D = t.replace("_id_", l);
                $.getScript(D);
                var g = $_cookie("weather_defaultCity");
                g ? u.hide() : u.show()
            } else {
                var g = $_cookie("weather_defaultCity");
                if (!g) {
                    var w = $.ajax({
                        url: "http://wgeo.weather.com.cn/ip/",
                        timeout: 3e3,
                        type: "GET",
                        dataType: "script",
                        success: function() {
                            var a = id;
                            $_cookie("weather_defaultCity", a + "|" + addr.split(",")[2], {
                                expires: 999
                            });
                            var s = a.toString().substr(0, 5)
                              , r = a.toString().substr(0, 7);
                            if (!b[s] || !b[s].t2[r])
                                var s = 10101
                                  , r = 1010101
                                  , a = 101010100;
                            e.find(".city").text(b[s].t1);
                            var c = b[s] && b[s].t2[r] && b[s].t2[r].c2 || [];
                            i(c),
                            i(c);
                            var d = t.replace("_id_", a);
                            $.getScript(d)
                        },
                        complete: function(a, s) {
                            if ("timeout" == s) {
                                w.abort();
                                var r = 101010100
                                  , c = r.toString().substr(0, 5)
                                  , d = r.toString().substr(0, 7);
                                e.find(".city").text(b[c].t1);
                                var h = b[c] && b[c].t2[d] && b[c].t2[d].c2 || [];
                                i(h),
                                i(h);
                                var n = t.replace("_id_", r);
                                $.getScript(n)
                            }
                        }
                    });
                    return
                }
                u.hide();
                var j = g.split("|")
                  , l = j[0]
                  , m = l.toString().substr(0, 5)
                  , v = l.toString().substr(0, 7);
                e.find(".city").text(j[1]);
                var D = t.replace("_id_", l);
                $.getScript(D)
            }
        }
    }
    require("jquery"),
    require("j/tool/raphael"),
    require("j/tool/cookie");
    var t = "http://d1.weather.com.cn/aqi_all/_id_.html"
      , b = {
        10101: {
            t1: "北京",
            t2: {
                1010101: {
                    c1: "北京",
                    c2: {
                        99006: {
                            b1: "万寿西宫"
                        },
                        99007: {
                            b1: "定陵"
                        },
                        99008: {
                            b1: "东四"
                        },
                        99009: {
                            b1: "天坛"
                        },
                        99010: {
                            b1: "农展馆"
                        },
                        99011: {
                            b1: "官园"
                        },
                        99012: {
                            b1: "海淀区万柳"
                        },
                        99013: {
                            b1: "顺义新城"
                        },
                        99014: {
                            b1: "怀柔镇"
                        },
                        99015: {
                            b1: "昌平镇"
                        },
                        99016: {
                            b1: "奥体中心"
                        },
                        99017: {
                            b1: "古城"
                        }
                    }
                }
            }
        },
        10102: {
            t1: "上海",
            t2: {
                1010201: {
                    c1: "上海",
                    c2: {
                        99298: {
                            b1: "普陀"
                        },
                        99299: {
                            b1: "十五厂"
                        },
                        99300: {
                            b1: "虹口"
                        },
                        99301: {
                            b1: "静安监测站"
                        },
                        99302: {
                            b1: "浦东川沙"
                        },
                        99303: {
                            b1: "浦东新区监测站"
                        },
                        99304: {
                            b1: "浦东张江"
                        },
                        99305: {
                            b1: "青浦淀山湖"
                        },
                        99306: {
                            b1: "徐汇上师大"
                        },
                        99307: {
                            b1: "杨浦四漂"
                        }
                    }
                }
            }
        },
        10103: {
            t1: "天津",
            t2: {
                1010301: {
                    c1: "天津",
                    c2: {
                        99375: {
                            b1: "河东站"
                        },
                        99376: {
                            b1: "机车车辆厂"
                        },
                        99377: {
                            b1: "继电器厂"
                        },
                        99378: {
                            b1: "南京路"
                        },
                        99379: {
                            b1: "市监测中心"
                        },
                        99380: {
                            b1: "北辰科技园区"
                        },
                        99381: {
                            b1: "东丽中学"
                        },
                        99382: {
                            b1: "河西站"
                        },
                        99383: {
                            b1: "空港物流加工区"
                        },
                        99384: {
                            b1: "梅江小区"
                        },
                        99385: {
                            b1: "泰丰工业园"
                        },
                        99386: {
                            b1: "天山路"
                        },
                        99387: {
                            b1: "团泊洼"
                        },
                        99388: {
                            b1: "永明路"
                        },
                        99389: {
                            b1: "中新生态城"
                        }
                    }
                }
            }
        },
        10104: {
            t1: "重庆",
            t2: {
                1010401: {
                    c1: "重庆",
                    c2: {
                        99060: {
                            b1: "缙云山"
                        },
                        99061: {
                            b1: "高家花园"
                        },
                        99062: {
                            b1: "天生"
                        },
                        99063: {
                            b1: "两路"
                        },
                        99064: {
                            b1: "虎溪"
                        },
                        99065: {
                            b1: "南坪"
                        },
                        99066: {
                            b1: "唐家沱"
                        },
                        99067: {
                            b1: "茶园"
                        },
                        99068: {
                            b1: "白市驿"
                        },
                        99069: {
                            b1: "解放碑"
                        },
                        99070: {
                            b1: "蔡家"
                        },
                        99071: {
                            b1: "空港"
                        },
                        99072: {
                            b1: "礼嘉"
                        },
                        99073: {
                            b1: "南泉"
                        },
                        99074: {
                            b1: "新山村"
                        },
                        99075: {
                            b1: "杨家坪"
                        },
                        99076: {
                            b1: "鱼新街"
                        }
                    }
                }
            }
        },
        10105: {
            t1: "黑龙江",
            t2: {
                1010501: {
                    c1: "哈尔滨",
                    c2: {
                        99129: {
                            b1: "岭北"
                        },
                        99130: {
                            b1: "阿城会宁"
                        },
                        99131: {
                            b1: "道外承德广场"
                        },
                        99132: {
                            b1: "动力和平路"
                        },
                        99133: {
                            b1: "呼兰师专"
                        },
                        99134: {
                            b1: "南岗学府路"
                        },
                        99135: {
                            b1: "道里建国路"
                        },
                        99136: {
                            b1: "平房东轻厂"
                        },
                        99137: {
                            b1: "松北商大"
                        },
                        99138: {
                            b1: "太平宏伟公园"
                        },
                        99139: {
                            b1: "香坊红旗大街"
                        },
                        99140: {
                            b1: "省农科院"
                        }
                    }
                },
                1010502: {
                    c1: "齐齐哈尔",
                    c2: {
                        99840: {
                            b1: "安居小区"
                        },
                        99841: {
                            b1: "中心广场"
                        },
                        99842: {
                            b1: "农牧车辆厂"
                        },
                        99843: {
                            b1: "富区环保局"
                        },
                        99844: {
                            b1: "市环境监测站"
                        }
                    }
                },
                1010503: {
                    c1: "牡丹江",
                    c2: {
                        99816: {
                            b1: "环保大楼"
                        },
                        99817: {
                            b1: "文化广场"
                        },
                        99818: {
                            b1: "第一医院"
                        },
                        99819: {
                            b1: "机车工厂"
                        },
                        99820: {
                            b1: "第一中学"
                        }
                    }
                },
                1010509: {
                    c1: "大庆",
                    c2: {
                        99947: {
                            b1: "龙凤区"
                        },
                        99948: {
                            b1: "萨尔图区"
                        },
                        99949: {
                            b1: "让胡路区"
                        },
                        99087: {
                            b1: "大同区"
                        },
                        99088: {
                            b1: "红岗区"
                        }
                    }
                }
            }
        },
        10106: {
            t1: "吉林",
            t2: {
                1010601: {
                    c1: "长春",
                    c2: {
                        99021: {
                            b1: "食品厂"
                        },
                        99022: {
                            b1: "客车厂"
                        },
                        99023: {
                            b1: "邮电学院"
                        },
                        99024: {
                            b1: "劳动公园"
                        },
                        99025: {
                            b1: "园林处"
                        },
                        99026: {
                            b1: "净月潭"
                        },
                        99027: {
                            b1: "甩湾子"
                        },
                        99028: {
                            b1: "经开区环卫处"
                        },
                        99029: {
                            b1: "高新区管委会"
                        },
                        99030: {
                            b1: "岱山公园"
                        }
                    }
                },
                1010602: {
                    c1: "吉林",
                    c2: {
                        99740: {
                            b1: "哈达湾"
                        },
                        99741: {
                            b1: "东局子"
                        },
                        99742: {
                            b1: "电力学院"
                        },
                        99743: {
                            b1: "江北"
                        },
                        99744: {
                            b1: "江南公园"
                        },
                        99745: {
                            b1: "农科院"
                        },
                        99746: {
                            b1: "丰满"
                        }
                    }
                }
            }
        },
        10107: {
            t1: "辽宁",
            t2: {
                1010714: {
                    c1: "葫芦岛",
                    c2: {
                        99563: {
                            b1: "葫芦岛市西山坡"
                        },
                        99564: {
                            b1: "化工医院"
                        },
                        99565: {
                            b1: "新区公园"
                        },
                        99566: {
                            b1: "连山区政府"
                        }
                    }
                },
                1010713: {
                    c1: "盘锦",
                    c2: {
                        99591: {
                            b1: "开发区"
                        },
                        99592: {
                            b1: "兴隆台"
                        },
                        99593: {
                            b1: "鼎翔"
                        }
                    }
                },
                1010708: {
                    c1: "营口",
                    c2: {
                        99608: {
                            b1: "三水厂"
                        },
                        99609: {
                            b1: "西炮台"
                        },
                        99610: {
                            b1: "营口大学"
                        },
                        99611: {
                            b1: "植物园"
                        }
                    }
                },
                1010703: {
                    c1: "鞍山",
                    c2: {
                        99672: {
                            b1: "深沟寺"
                        },
                        99673: {
                            b1: "中心站"
                        },
                        99674: {
                            b1: "太平子站"
                        },
                        99675: {
                            b1: "铁西"
                        },
                        99676: {
                            b1: "开发区"
                        },
                        99677: {
                            b1: "明达新区"
                        },
                        99678: {
                            b1: "千山公园"
                        }
                    }
                },
                1010702: {
                    c1: "大连",
                    c2: {
                        99077: {
                            b1: "甘井子"
                        },
                        99078: {
                            b1: "星海三站"
                        },
                        99079: {
                            b1: "周水子"
                        },
                        99080: {
                            b1: "傅家庄"
                        },
                        99081: {
                            b1: "金州"
                        },
                        99082: {
                            b1: "开发区"
                        },
                        99083: {
                            b1: "旅顺"
                        },
                        99084: {
                            b1: "七贤岭"
                        },
                        99085: {
                            b1: "青泥洼桥"
                        },
                        99086: {
                            b1: "双D港"
                        }
                    }
                },
                1010701: {
                    c1: "沈阳",
                    c2: {
                        99311: {
                            b1: "北陵"
                        },
                        99312: {
                            b1: "东软"
                        },
                        99313: {
                            b1: "辉山"
                        },
                        99314: {
                            b1: "浑南二"
                        },
                        99315: {
                            b1: "炮兵学院"
                        },
                        99316: {
                            b1: "太原街"
                        },
                        99317: {
                            b1: "文艺路"
                        },
                        99318: {
                            b1: "小河沿"
                        },
                        99319: {
                            b1: "张士"
                        },
                        99320: {
                            b1: "二毛"
                        },
                        99321: {
                            b1: "辽大"
                        }
                    }
                },
                1010706: {
                    c1: "丹东",
                    c2: {
                        99536: {
                            b1: "轴承厂"
                        },
                        99537: {
                            b1: "财专"
                        },
                        99538: {
                            b1: "元宝山水厂"
                        },
                        99539: {
                            b1: "实验小学"
                        }
                    }
                },
                1010705: {
                    c1: "本溪",
                    c2: {
                        99684: {
                            b1: "大峪"
                        },
                        99685: {
                            b1: "溪湖"
                        },
                        99686: {
                            b1: "彩屯"
                        },
                        99687: {
                            b1: "东明"
                        },
                        99688: {
                            b1: "职业病院"
                        },
                        99689: {
                            b1: "威宁"
                        }
                    }
                },
                1010704: {
                    c1: "抚顺",
                    c2: {
                        99709: {
                            b1: "望花"
                        },
                        99710: {
                            b1: "新华"
                        },
                        99711: {
                            b1: "东洲"
                        },
                        99712: {
                            b1: "站前"
                        },
                        99713: {
                            b1: "水库"
                        },
                        99714: {
                            b1: "沈抚新城"
                        }
                    }
                },
                1010707: {
                    c1: "锦州",
                    c2: {
                        99757: {
                            b1: "南山"
                        },
                        99758: {
                            b1: "开发区"
                        },
                        99759: {
                            b1: "百股水厂"
                        },
                        99760: {
                            b1: "监测站"
                        },
                        99761: {
                            b1: "北湖公园"
                        }
                    }
                }
            }
        },
        10108: {
            t1: "内蒙古",
            t2: {
                1010806: {
                    c1: "赤峰",
                    c2: {
                        99701: {
                            b1: "松山一中"
                        },
                        99702: {
                            b1: "哈达街"
                        },
                        99703: {
                            b1: "天义路"
                        },
                        99704: {
                            b1: "松山路"
                        }
                    }
                },
                1010801: {
                    c1: "呼和浩特",
                    c2: {
                        99183: {
                            b1: "如意水处理厂"
                        },
                        99184: {
                            b1: "糖厂"
                        },
                        99185: {
                            b1: "小召"
                        },
                        99186: {
                            b1: "兴松小区"
                        },
                        99179: {
                            b1: "呼市一监"
                        },
                        99180: {
                            b1: "二十九中"
                        },
                        99181: {
                            b1: "工大金川校区"
                        },
                        99182: {
                            b1: "化肥厂生活区"
                        }
                    }
                },
                1010802: {
                    c1: "包头",
                    c2: {
                        99518: {
                            b1: "市环境监测站"
                        },
                        99519: {
                            b1: "包百大楼"
                        },
                        99520: {
                            b1: "东河城环局"
                        },
                        99521: {
                            b1: "青山宾馆"
                        },
                        99522: {
                            b1: "惠龙物流"
                        },
                        99523: {
                            b1: "东河鸿龙湾"
                        }
                    }
                },
                1010807: {
                    c1: "鄂尔多斯",
                    c2: {
                        99552: {
                            b1: "综合楼"
                        },
                        99553: {
                            b1: "巴音孟克林场办事处"
                        },
                        99554: {
                            b1: "康泽苑"
                        },
                        99555: {
                            b1: "华泰汽车城"
                        },
                        99556: {
                            b1: "奥林花园"
                        }
                    }
                }
            }
        },
        10109: {
            t1: "河北",
            t2: {
                1010905: {
                    c1: "唐山",
                    c2: {
                        99369: {
                            b1: "供销社"
                        },
                        99370: {
                            b1: "雷达站"
                        },
                        99371: {
                            b1: "十二中"
                        },
                        99372: {
                            b1: "陶瓷公司"
                        },
                        99373: {
                            b1: "物资局"
                        },
                        99374: {
                            b1: "小山"
                        }
                    }
                },
                1010909: {
                    c1: "邢台",
                    c2: {
                        99443: {
                            b1: "达活泉"
                        },
                        99444: {
                            b1: "路桥公司"
                        },
                        99445: {
                            b1: "市环保局"
                        },
                        99446: {
                            b1: "邢师高专"
                        }
                    }
                },
                1010902: {
                    c1: "保定",
                    c2: {
                        99000: {
                            b1: "游泳馆"
                        },
                        99001: {
                            b1: "华电二区"
                        },
                        99002: {
                            b1: "接待中心"
                        },
                        99003: {
                            b1: "地表水厂"
                        },
                        99004: {
                            b1: "胶片厂"
                        },
                        99005: {
                            b1: "监测站"
                        }
                    }
                },
                1010907: {
                    c1: "沧州",
                    c2: {
                        99018: {
                            b1: "沧县城建局"
                        },
                        99019: {
                            b1: "电视转播站"
                        },
                        99020: {
                            b1: "市环保局"
                        }
                    }
                },
                1010906: {
                    c1: "廊坊",
                    c2: {
                        99220: {
                            b1: "北华航天学校"
                        },
                        99221: {
                            b1: "环境监测监理中心"
                        },
                        99222: {
                            b1: "开发区"
                        },
                        99223: {
                            b1: "药材公司"
                        }
                    }
                },
                1010904: {
                    c1: "承德",
                    c2: {
                        99047: {
                            b1: "铁路"
                        },
                        99048: {
                            b1: "中国银行"
                        },
                        99049: {
                            b1: "开发区"
                        },
                        99050: {
                            b1: "文化中心"
                        },
                        99051: {
                            b1: "离宫"
                        }
                    }
                },
                1010911: {
                    c1: "秦皇岛",
                    c2: {
                        99290: {
                            b1: "北戴河环保局"
                        },
                        99291: {
                            b1: "第一关"
                        },
                        99292: {
                            b1: "监测站"
                        },
                        99293: {
                            b1: "建设大夏"
                        },
                        99294: {
                            b1: "市政府"
                        }
                    }
                },
                1010901: {
                    c1: "石家庄",
                    c2: {
                        99333: {
                            b1: "高新区"
                        },
                        99334: {
                            b1: "化工学校"
                        },
                        99335: {
                            b1: "人民会堂"
                        },
                        99336: {
                            b1: "世纪公园"
                        },
                        99337: {
                            b1: "西北水源"
                        },
                        99338: {
                            b1: "西南高教"
                        },
                        99339: {
                            b1: "职工医院"
                        },
                        99340: {
                            b1: "封龙山"
                        }
                    }
                },
                1010903: {
                    c1: "张家口",
                    c2: {
                        99472: {
                            b1: "北泵房"
                        },
                        99473: {
                            b1: "人民公园"
                        },
                        99474: {
                            b1: "世纪豪园"
                        },
                        99475: {
                            b1: "探机厂"
                        },
                        99476: {
                            b1: "五金库"
                        }
                    }
                },
                1010908: {
                    c1: "衡水",
                    c2: {
                        99171: {
                            b1: "电机北厂"
                        },
                        99172: {
                            b1: "市环保局"
                        },
                        99173: {
                            b1: "市监测站"
                        }
                    }
                },
                1010910: {
                    c1: "邯郸",
                    c2: {
                        99146: {
                            b1: "丛台公园"
                        },
                        99147: {
                            b1: "东污水处理厂"
                        },
                        99148: {
                            b1: "环保局"
                        },
                        99149: {
                            b1: "矿院"
                        }
                    }
                }
            }
        },
        10110: {
            t1: "山西",
            t2: {
                1011005: {
                    c1: "长治",
                    c2: {
                        99531: {
                            b1: "清华站"
                        },
                        99532: {
                            b1: "监测站"
                        },
                        99533: {
                            b1: "澳瑞特"
                        },
                        99534: {
                            b1: "审计局"
                        },
                        99535: {
                            b1: "长治八中"
                        }
                    }
                },
                1011007: {
                    c1: "临汾",
                    c2: {
                        99575: {
                            b1: "工商学校"
                        },
                        99576: {
                            b1: "市委"
                        },
                        99577: {
                            b1: "南机场"
                        },
                        99578: {
                            b1: "市监测站"
                        },
                        99579: {
                            b1: "临钢医院"
                        },
                        99580: {
                            b1: "技工学校"
                        }
                    }
                },
                1011002: {
                    c1: "大同",
                    c2: {
                        99540: {
                            b1: "红旗广场"
                        },
                        99541: {
                            b1: "云冈宾馆"
                        },
                        99542: {
                            b1: "大同大学"
                        },
                        99543: {
                            b1: "安家小村"
                        },
                        99544: {
                            b1: "教育学院"
                        },
                        99545: {
                            b1: "果树场"
                        }
                    }
                },
                1011003: {
                    c1: "阳泉",
                    c2: {
                        99618: {
                            b1: "市中心"
                        },
                        99619: {
                            b1: "赛鱼"
                        },
                        99620: {
                            b1: "南庄"
                        },
                        99621: {
                            b1: "白羊墅"
                        },
                        99622: {
                            b1: "平坦"
                        },
                        99623: {
                            b1: "大阳泉"
                        }
                    }
                },
                1011001: {
                    c1: "太原",
                    c2: {
                        99353: {
                            b1: "尖草坪"
                        },
                        99354: {
                            b1: "涧河"
                        },
                        99355: {
                            b1: "晋源"
                        },
                        99356: {
                            b1: "上兰"
                        },
                        99357: {
                            b1: "桃园"
                        },
                        99358: {
                            b1: "坞城"
                        },
                        99359: {
                            b1: "小店"
                        },
                        99360: {
                            b1: "金胜"
                        },
                        99361: {
                            b1: "南寨"
                        }
                    }
                }
            }
        },
        10111: {
            t1: "陕西",
            t2: {
                1011103: {
                    c1: "延安",
                    c2: {
                        99624: {
                            b1: "枣园"
                        },
                        99625: {
                            b1: "延大医附院"
                        },
                        99626: {
                            b1: "市监测站"
                        },
                        99627: {
                            b1: "百米大道"
                        }
                    }
                },
                1011109: {
                    c1: "宝鸡",
                    c2: {
                        99511: {
                            b1: "竹园沟"
                        },
                        99512: {
                            b1: "三陆医院"
                        },
                        99513: {
                            b1: "监测站"
                        },
                        99514: {
                            b1: "技工学校"
                        },
                        99515: {
                            b1: "陈仓区环保局家属楼"
                        },
                        99516: {
                            b1: "文理学院"
                        },
                        99517: {
                            b1: "三迪小学"
                        },
                        99940: {
                            b1: "庙沟村"
                        }
                    }
                },
                1011102: {
                    c1: "咸阳",
                    c2: {
                        99628: {
                            b1: "气象站"
                        },
                        99629: {
                            b1: "中华小区"
                        },
                        99630: {
                            b1: "师范学院"
                        },
                        99631: {
                            b1: "中医学院"
                        }
                    }
                },
                1011110: {
                    c1: "铜川",
                    c2: {
                        99644: {
                            b1: "党校"
                        },
                        99645: {
                            b1: "王益区政府"
                        },
                        99646: {
                            b1: "新区管委会"
                        },
                        99647: {
                            b1: "新区兰芝公司"
                        }
                    }
                },
                1011105: {
                    c1: "渭南",
                    c2: {
                        99632: {
                            b1: "日报社"
                        },
                        99633: {
                            b1: "体育馆"
                        },
                        99634: {
                            b1: "农科所"
                        },
                        99635: {
                            b1: "高新一小"
                        }
                    }
                },
                1011101: {
                    c1: "西安",
                    c2: {
                        99423: {
                            b1: "纺织城"
                        },
                        99424: {
                            b1: "高新西区"
                        },
                        99425: {
                            b1: "高压开关厂"
                        },
                        99426: {
                            b1: "经开区"
                        },
                        99427: {
                            b1: "市人民体育场"
                        },
                        99428: {
                            b1: "小寨"
                        },
                        99429: {
                            b1: "兴庆小区"
                        },
                        99430: {
                            b1: "草滩"
                        },
                        99431: {
                            b1: "广运潭"
                        },
                        99432: {
                            b1: "临潼区"
                        },
                        99433: {
                            b1: "曲江文化产业集团"
                        },
                        99434: {
                            b1: "阎良区"
                        },
                        99435: {
                            b1: "长安区"
                        }
                    }
                }
            }
        },
        10112: {
            t1: "山东",
            t2: {
                1011207: {
                    c1: "济宁",
                    c2: {
                        99567: {
                            b1: "火炬城"
                        },
                        99568: {
                            b1: "监测站"
                        },
                        99569: {
                            b1: "电化厂"
                        }
                    }
                },
                1011217: {
                    c1: "聊城",
                    c2: {
                        99573: {
                            b1: "区政府"
                        },
                        99574: {
                            b1: "党校"
                        },
                        99938: {
                            b1: "二轻机"
                        }
                    }
                },
                1011201: {
                    c1: "济南",
                    c2: {
                        99202: {
                            b1: "机床二厂"
                        },
                        99203: {
                            b1: "济南化工厂"
                        },
                        99204: {
                            b1: "开发区"
                        },
                        99205: {
                            b1: "科干所"
                        },
                        99206: {
                            b1: "农科所"
                        },
                        99207: {
                            b1: "省种子仓库"
                        },
                        99208: {
                            b1: "市监测站"
                        },
                        99209: {
                            b1: "长清党校"
                        }
                    }
                },
                1011202: {
                    c1: "青岛",
                    c2: {
                        99281: {
                            b1: "城阳区子站"
                        },
                        99282: {
                            b1: "黄岛区子站"
                        },
                        99283: {
                            b1: "崂山区子站"
                        },
                        99284: {
                            b1: "李沧区子站"
                        },
                        99285: {
                            b1: "市北区子站"
                        },
                        99286: {
                            b1: "市南区东部子站"
                        },
                        99287: {
                            b1: "市南区西部子站"
                        },
                        99288: {
                            b1: "四方区子站"
                        },
                        99289: {
                            b1: "仰口"
                        }
                    }
                },
                1011213: {
                    c1: "威海",
                    c2: {
                        99636: {
                            b1: "市监测站"
                        },
                        99637: {
                            b1: "华夏技校"
                        },
                        99638: {
                            b1: "山大分校"
                        }
                    }
                },
                1011202: {
                    c1: "胶州",
                    c2: {
                        99728: {
                            b1: "胶州环保局"
                        },
                        99729: {
                            b1: "胶州一中"
                        }
                    }
                },
                1011210: {
                    c1: "菏泽",
                    c2: {
                        99560: {
                            b1: "市气象局"
                        },
                        99561: {
                            b1: "市政协"
                        },
                        99562: {
                            b1: "菏泽学院"
                        }
                    }
                },
                1011216: {
                    c1: "莱芜",
                    c2: {
                        99570: {
                            b1: "植物油厂"
                        },
                        99571: {
                            b1: "技术学院"
                        },
                        99572: {
                            b1: "日升国际"
                        }
                    }
                },
                1011213: {
                    c1: "乳山",
                    c2: {
                        99849: {
                            b1: "乳山市环保局"
                        },
                        99850: {
                            b1: "乳山市气象局"
                        }
                    }
                },
                1011208: {
                    c1: "泰安",
                    c2: {
                        99648: {
                            b1: "监测站"
                        },
                        99649: {
                            b1: "人口学校"
                        },
                        99650: {
                            b1: "电力学校"
                        }
                    }
                },
                1011202: {
                    c1: "即墨",
                    c2: {
                        99747: {
                            b1: "环保局子站"
                        },
                        99748: {
                            b1: "开发区子站"
                        }
                    }
                },
                1011202: {
                    c1: "莱西",
                    c2: {
                        99781: {
                            b1: "环保局子站"
                        },
                        99782: {
                            b1: "人民广场子站"
                        }
                    }
                },
                1011202: {
                    c1: "平度",
                    c2: {
                        99838: {
                            b1: "1号"
                        },
                        99839: {
                            b1: "2号"
                        }
                    }
                },
                1011206: {
                    c1: "寿光",
                    c2: {
                        99864: {
                            b1: "监测站"
                        },
                        99865: {
                            b1: "世纪学校"
                        }
                    }
                },
                1011203: {
                    c1: "淄博",
                    c2: {
                        99594: {
                            b1: "人民公园"
                        },
                        99595: {
                            b1: "东风化工厂"
                        },
                        99596: {
                            b1: "双山"
                        },
                        99597: {
                            b1: "气象站"
                        },
                        99598: {
                            b1: "莆田园"
                        },
                        99599: {
                            b1: "三金集团"
                        }
                    }
                },
                1011205: {
                    c1: "莱州",
                    c2: {
                        99783: {
                            b1: "莱州环保局"
                        },
                        99784: {
                            b1: "莱州外经委"
                        }
                    }
                },
                1011214: {
                    c1: "枣庄",
                    c2: {
                        99600: {
                            b1: "薛城环保局"
                        },
                        99601: {
                            b1: "峄城区政府"
                        },
                        99602: {
                            b1: "台儿庄区环保局"
                        },
                        99603: {
                            b1: "山亭区环保局"
                        },
                        99604: {
                            b1: "市中区政府"
                        }
                    }
                },
                1011205: {
                    c1: "烟台",
                    c2: {
                        99612: {
                            b1: "开发区"
                        },
                        99613: {
                            b1: "轴承厂"
                        },
                        99614: {
                            b1: "西郊化工站"
                        },
                        99615: {
                            b1: "莱山环保局"
                        },
                        99616: {
                            b1: "福山环保局"
                        },
                        99617: {
                            b1: "牟平环保局"
                        }
                    }
                },
                1011205: {
                    c1: "招远",
                    c2: {
                        99924: {
                            b1: "招远环保局"
                        },
                        99925: {
                            b1: "招远教育局"
                        }
                    }
                },
                1011204: {
                    c1: "德州",
                    c2: {
                        99546: {
                            b1: "黑马集团"
                        },
                        99547: {
                            b1: "监理站"
                        },
                        99548: {
                            b1: "儿童乐园"
                        }
                    }
                },
                1011212: {
                    c1: "东营",
                    c2: {
                        99549: {
                            b1: "西城阳光环保公司"
                        },
                        99550: {
                            b1: "市环保局"
                        },
                        99551: {
                            b1: "耿井村"
                        },
                        99941: {
                            b1: "广南水库"
                        }
                    }
                },
                1011209: {
                    c1: "临沂",
                    c2: {
                        99581: {
                            b1: "沂河小区"
                        },
                        99582: {
                            b1: "鲁南制药厂"
                        },
                        99583: {
                            b1: "新光毛纺厂"
                        },
                        99584: {
                            b1: "河东保险公司"
                        }
                    }
                },
                1011206: {
                    c1: "潍坊",
                    c2: {
                        99639: {
                            b1: "共达公司"
                        },
                        99640: {
                            b1: "寒亭监测站"
                        },
                        99641: {
                            b1: "仲裁委"
                        },
                        99642: {
                            b1: "刘家园"
                        },
                        99643: {
                            b1: "环保局"
                        }
                    }
                },
                1011215: {
                    c1: "日照",
                    c2: {
                        99662: {
                            b1: "监测站"
                        },
                        99663: {
                            b1: "市政府广场"
                        },
                        99664: {
                            b1: "港务局"
                        }
                    }
                },
                1011205: {
                    c1: "蓬莱",
                    c2: {
                        99832: {
                            b1: "蓬莱环保局"
                        },
                        99833: {
                            b1: "蓬莱博物馆"
                        }
                    }
                },
                1011213: {
                    c1: "荣成",
                    c2: {
                        99847: {
                            b1: "荣成市环保局办公楼"
                        },
                        99848: {
                            b1: "山东成山轮胎公司"
                        }
                    }
                },
                1011211: {
                    c1: "滨州",
                    c2: {
                        99528: {
                            b1: "市环保局"
                        },
                        99529: {
                            b1: "第二水厂"
                        },
                        99530: {
                            b1: "北中新校"
                        }
                    }
                },
                1011213: {
                    c1: "文登",
                    c2: {
                        99870: {
                            b1: "文登市环保局"
                        },
                        99871: {
                            b1: "文登市丝绸公司"
                        }
                    }
                },
                1011201: {
                    c1: "章丘",
                    c2: {
                        99912: {
                            b1: "环境监测站"
                        },
                        99913: {
                            b1: "明水开发区"
                        }
                    }
                }
            }
        },
        10113: {
            t1: "新疆",
            t2: {
                1011306: {
                    c1: "库尔勒",
                    c2: {
                        99776: {
                            b1: "孔雀公园"
                        },
                        99777: {
                            b1: "棉纺厂"
                        },
                        99778: {
                            b1: "经济开发区"
                        }
                    }
                },
                1011301: {
                    c1: "乌鲁木齐",
                    c2: {
                        99404: {
                            b1: "监测站"
                        },
                        99405: {
                            b1: "七十四中学"
                        },
                        99406: {
                            b1: "三十一中学"
                        },
                        99407: {
                            b1: "收费所"
                        },
                        99408: {
                            b1: "铁路局"
                        },
                        99409: {
                            b1: "新疆农科院农场"
                        },
                        99410: {
                            b1: "米东区环保局"
                        }
                    }
                },
                1011302: {
                    c1: "克拉玛依",
                    c2: {
                        99771: {
                            b1: "长征新村"
                        },
                        99772: {
                            b1: "南林小区"
                        },
                        99773: {
                            b1: "白碱滩区"
                        },
                        99774: {
                            b1: "独山子区"
                        },
                        99775: {
                            b1: "乌尔禾区商贸楼"
                        }
                    }
                }
            }
        },
        10114: {
            t1: "西藏",
            t2: {
                1011401: {
                    c1: "拉萨",
                    c2: {
                        99229: {
                            b1: "八廓街"
                        },
                        99230: {
                            b1: "拉萨火车站"
                        },
                        99231: {
                            b1: "区辐射站"
                        },
                        99232: {
                            b1: "区监测站"
                        },
                        99233: {
                            b1: "市环保局"
                        },
                        99234: {
                            b1: "西藏大学"
                        }
                    }
                }
            }
        },
        10115: {
            t1: "青海",
            t2: {
                1011501: {
                    c1: "西宁",
                    c2: {
                        99447: {
                            b1: "省医药仓库"
                        },
                        99448: {
                            b1: "市环境监测站"
                        },
                        99449: {
                            b1: "四陆医院"
                        },
                        99450: {
                            b1: "第五水厂"
                        }
                    }
                }
            }
        },
        10116: {
            t1: "甘肃",
            t2: {
                1011614: {
                    c1: "嘉峪关",
                    c2: {
                        99734: {
                            b1: "气象局"
                        },
                        99735: {
                            b1: "酒钢耐材公司"
                        }
                    }
                },
                1011606: {
                    c1: "金昌",
                    c2: {
                        99749: {
                            b1: "市科委"
                        },
                        99750: {
                            b1: "新川苑"
                        },
                        99751: {
                            b1: "公司二招"
                        }
                    }
                },
                1011601: {
                    c1: "兰州",
                    c2: {
                        99224: {
                            b1: "兰炼宾馆"
                        },
                        99225: {
                            b1: "生物制品所"
                        },
                        99226: {
                            b1: "铁路设计院"
                        },
                        99227: {
                            b1: "榆中兰大校区"
                        },
                        99228: {
                            b1: "职工医院"
                        }
                    }
                }
            }
        },
        10117: {
            t1: "宁夏",
            t2: {
                1011701: {
                    c1: "银川",
                    c2: {
                        99466: {
                            b1: "贺兰山东路"
                        },
                        99467: {
                            b1: "贺兰山马莲口"
                        },
                        99468: {
                            b1: "宁安大街"
                        },
                        99469: {
                            b1: "宁化生活区"
                        },
                        99470: {
                            b1: "学院路"
                        },
                        99471: {
                            b1: "银湖巷"
                        }
                    }
                },
                1011702: {
                    c1: "石嘴山",
                    c2: {
                        99860: {
                            b1: "沙湖旅游区"
                        },
                        99861: {
                            b1: "大武口黄河东街"
                        },
                        99862: {
                            b1: "惠农南大街"
                        },
                        99863: {
                            b1: "红果子镇惠新街"
                        }
                    }
                }
            }
        },
        10118: {
            t1: "河南",
            t2: {
                1011802: {
                    c1: "安阳",
                    c2: {
                        99679: {
                            b1: "棉研所"
                        },
                        99680: {
                            b1: "红庙街"
                        },
                        99681: {
                            b1: "银杏小区"
                        },
                        99682: {
                            b1: "环保局"
                        },
                        99683: {
                            b1: "铁佛寺"
                        }
                    }
                },
                1011817: {
                    c1: "三门峡",
                    c2: {
                        99851: {
                            b1: "市政府"
                        },
                        99852: {
                            b1: "开发区"
                        },
                        99853: {
                            b1: "二 印"
                        },
                        99854: {
                            b1: "风景区"
                        }
                    }
                },
                1011801: {
                    c1: "郑州",
                    c2: {
                        99481: {
                            b1: "岗李水库"
                        },
                        99482: {
                            b1: "供水公司"
                        },
                        99483: {
                            b1: "河医大"
                        },
                        99484: {
                            b1: "经开区管委"
                        },
                        99485: {
                            b1: "市监测站"
                        },
                        99486: {
                            b1: "四十七中"
                        },
                        99487: {
                            b1: "烟厂"
                        },
                        99488: {
                            b1: "银行学校"
                        },
                        99489: {
                            b1: "郑纺机"
                        }
                    }
                },
                1011811: {
                    c1: "焦作",
                    c2: {
                        99730: {
                            b1: "市监测站"
                        },
                        99731: {
                            b1: "市环保局　"
                        },
                        99732: {
                            b1: "高新区政府"
                        },
                        99733: {
                            b1: "影视城"
                        }
                    }
                },
                1011809: {
                    c1: "洛阳",
                    c2: {
                        99789: {
                            b1: "中信二小"
                        },
                        99790: {
                            b1: "市委党校"
                        },
                        99791: {
                            b1: "市监测站"
                        },
                        99792: {
                            b1: "豫西宾馆"
                        },
                        99793: {
                            b1: "河南林校"
                        },
                        99794: {
                            b1: "开发区管委会"
                        },
                        99795: {
                            b1: "市委新办公区"
                        }
                    }
                },
                1011808: {
                    c1: "开封",
                    c2: {
                        99943: {
                            b1: "河大一附院"
                        },
                        99944: {
                            b1: "肿瘤医院"
                        },
                        99945: {
                            b1: "妇幼保健院"
                        },
                        99946: {
                            b1: "世纪星幼儿园"
                        }
                    }
                },
                1011805: {
                    c1: "平顶山",
                    c2: {
                        99834: {
                            b1: "高压开关厂"
                        },
                        99835: {
                            b1: "新华旅馆"
                        },
                        99836: {
                            b1: "规划设计院"
                        },
                        99837: {
                            b1: "平顶山工学院"
                        }
                    }
                }
            }
        },
        10119: {
            t1: "江苏",
            t2: {
                1011908: {
                    c1: "徐州",
                    c2: {
                        99451: {
                            b1: "淮塔"
                        },
                        99452: {
                            b1: "黄河新村"
                        },
                        99453: {
                            b1: "农科院"
                        },
                        99454: {
                            b1: "桃园路"
                        },
                        99455: {
                            b1: "铜山区环保局"
                        },
                        99456: {
                            b1: "铜山兽医院"
                        },
                        99457: {
                            b1: "新城区"
                        }
                    }
                },
                1011903: {
                    c1: "镇江",
                    c2: {
                        99490: {
                            b1: "丹徒区监测站"
                        },
                        99491: {
                            b1: "环境监测站"
                        },
                        99492: {
                            b1: "新区办事处"
                        },
                        99493: {
                            b1: "职教中心"
                        }
                    }
                },
                1011904: {
                    c1: "苏州",
                    c2: {
                        99345: {
                            b1: "彩香"
                        },
                        99346: {
                            b1: "南门"
                        },
                        99347: {
                            b1: "上方山"
                        },
                        99348: {
                            b1: "吴中区"
                        },
                        99349: {
                            b1: "轧钢厂"
                        },
                        99350: {
                            b1: "苏州工业园区"
                        },
                        99351: {
                            b1: "苏州新区"
                        },
                        99352: {
                            b1: "相城区"
                        }
                    }
                },
                1011903: {
                    c1: "句容",
                    c2: {
                        99769: {
                            b1: "消防指挥中心"
                        },
                        99770: {
                            b1: "房家坝"
                        }
                    }
                },
                1011904: {
                    c1: "张家港",
                    c2: {
                        99906: {
                            b1: "张家港市监测站"
                        },
                        99907: {
                            b1: "城北小学"
                        }
                    }
                },
                1011902: {
                    c1: "无锡",
                    c2: {
                        99411: {
                            b1: "曹张"
                        },
                        99412: {
                            b1: "大学城"
                        },
                        99413: {
                            b1: "东亭"
                        },
                        99414: {
                            b1: "漆塘"
                        },
                        99415: {
                            b1: "市北高中"
                        },
                        99416: {
                            b1: "旺庄"
                        },
                        99417: {
                            b1: "堰桥"
                        },
                        99418: {
                            b1: "育红小学"
                        }
                    }
                },
                1011904: {
                    c1: "常熟",
                    c2: {
                        99695: {
                            b1: "海虞子站"
                        },
                        99696: {
                            b1: "兴福子站"
                        },
                        99697: {
                            b1: "菱塘子站"
                        }
                    }
                },
                1011907: {
                    c1: "盐城",
                    c2: {
                        99458: {
                            b1: "市监测站"
                        },
                        99459: {
                            b1: "盐城电厂"
                        },
                        99460: {
                            b1: "开发区管委会"
                        },
                        99461: {
                            b1: "文峰中学"
                        }
                    }
                },
                1011904: {
                    c1: "昆山",
                    c2: {
                        99779: {
                            b1: "昆山实验小学"
                        },
                        99780: {
                            b1: "震川中学"
                        }
                    }
                },
                1011911: {
                    c1: "溧阳",
                    c2: {
                        99787: {
                            b1: "溧阳市东门子站"
                        },
                        99788: {
                            b1: "燕山子站"
                        }
                    }
                },
                1011909: {
                    c1: "淮安",
                    c2: {
                        99174: {
                            b1: "北京南路"
                        },
                        99175: {
                            b1: "钵池山"
                        },
                        99176: {
                            b1: "楚州区监测站"
                        },
                        99177: {
                            b1: "淮阴区监测站"
                        },
                        99178: {
                            b1: "市监测站"
                        }
                    }
                },
                1011905: {
                    c1: "南通",
                    c2: {
                        99268: {
                            b1: "虹桥"
                        },
                        99269: {
                            b1: "南郊"
                        },
                        99270: {
                            b1: "城中"
                        },
                        99271: {
                            b1: "星湖花园"
                        },
                        99272: {
                            b1: "紫琅学院"
                        }
                    }
                },
                1011912: {
                    c1: "泰州",
                    c2: {
                        99365: {
                            b1: "高港区政府"
                        },
                        99366: {
                            b1: "公园路"
                        },
                        99367: {
                            b1: "莲花"
                        },
                        99368: {
                            b1: "留学生创业园"
                        }
                    }
                },
                1011905: {
                    c1: "海门",
                    c2: {
                        99721: {
                            b1: "海门市监测站"
                        },
                        99722: {
                            b1: "蓓蕾幼儿园"
                        }
                    }
                },
                1011904: {
                    c1: "太仓",
                    c2: {
                        99866: {
                            b1: "太仓市监测站"
                        },
                        99867: {
                            b1: "科教新城实小"
                        }
                    }
                },
                1011904: {
                    c1: "吴江",
                    c2: {
                        99876: {
                            b1: "吴江市环保局"
                        },
                        99877: {
                            b1: "教师进修学校"
                        },
                        99878: {
                            b1: "吴江开发区"
                        }
                    }
                },
                1011911: {
                    c1: "常州",
                    c2: {
                        99041: {
                            b1: "市监测站"
                        },
                        99042: {
                            b1: "城建学校"
                        },
                        99043: {
                            b1: "常工院"
                        },
                        99044: {
                            b1: "潞城"
                        },
                        99045: {
                            b1: "武进监测站"
                        },
                        99046: {
                            b1: "安家"
                        }
                    }
                },
                1011901: {
                    c1: "南京",
                    c2: {
                        99251: {
                            b1: "奥体中心"
                        },
                        99252: {
                            b1: "草场门"
                        },
                        99253: {
                            b1: "迈皋桥"
                        },
                        99254: {
                            b1: "浦口"
                        },
                        99255: {
                            b1: "瑞金路"
                        },
                        99256: {
                            b1: "山西路"
                        },
                        99257: {
                            b1: "仙林大学城"
                        },
                        99258: {
                            b1: "玄武湖"
                        },
                        99259: {
                            b1: "中华门"
                        }
                    }
                },
                1011902: {
                    c1: "江阴",
                    c2: {
                        99723: {
                            b1: "虹桥邮政"
                        },
                        99724: {
                            b1: "五星公园"
                        },
                        99725: {
                            b1: "第二实验小学"
                        }
                    }
                },
                1011911: {
                    c1: "金坛",
                    c2: {
                        99755: {
                            b1: "金坛市环境监测站"
                        },
                        99756: {
                            b1: "金坛市自来水公司"
                        }
                    }
                },
                1011902: {
                    c1: "宜兴",
                    c2: {
                        99895: {
                            b1: "宜兴市环保局"
                        },
                        99896: {
                            b1: "宜园"
                        }
                    }
                },
                1011910: {
                    c1: "连云港",
                    c2: {
                        99235: {
                            b1: "洪门派出所"
                        },
                        99236: {
                            b1: "开发区恒瑞医药公司"
                        },
                        99237: {
                            b1: "市环境监测站"
                        },
                        99238: {
                            b1: "墟沟核电专家村"
                        }
                    }
                },
                1011913: {
                    c1: "宿迁",
                    c2: {
                        99341: {
                            b1: "市监测站"
                        },
                        99342: {
                            b1: "宿迁学院"
                        },
                        99343: {
                            b1: "宿迁中学"
                        },
                        99344: {
                            b1: "宿豫区环保局"
                        }
                    }
                },
                1011906: {
                    c1: "扬州",
                    c2: {
                        99462: {
                            b1: "城东财政所"
                        },
                        99463: {
                            b1: "第四医院"
                        },
                        99464: {
                            b1: "邗江监测站"
                        },
                        99465: {
                            b1: "市监测站"
                        }
                    }
                }
            }
        },
        10120: {
            t1: "湖北",
            t2: {
                1012001: {
                    c1: "武汉",
                    c2: {
                        99394: {
                            b1: "东湖梨园"
                        },
                        99395: {
                            b1: "沌口新区"
                        },
                        99396: {
                            b1: "汉口花桥"
                        },
                        99397: {
                            b1: "汉阳月湖"
                        },
                        99398: {
                            b1: "青山钢花"
                        },
                        99399: {
                            b1: "武昌紫阳"
                        },
                        99400: {
                            b1: "沉湖七壕"
                        },
                        99401: {
                            b1: "东湖高新"
                        },
                        99402: {
                            b1: "汉口江滩"
                        },
                        99403: {
                            b1: "吴家山"
                        }
                    }
                },
                1012008: {
                    c1: "荆州",
                    c2: {
                        99752: {
                            b1: "市图书馆"
                        },
                        99753: {
                            b1: "市委党校"
                        },
                        99754: {
                            b1: "科融环保"
                        }
                    }
                },
                1012009: {
                    c1: "宜昌",
                    c2: {
                        99888: {
                            b1: "四零三"
                        },
                        99889: {
                            b1: "白龙岗"
                        },
                        99890: {
                            b1: "伍家岗"
                        },
                        99891: {
                            b1: "点军区"
                        },
                        99892: {
                            b1: "夷陵区"
                        }
                    }
                }
            }
        },
        10121: {
            t1: "浙江",
            t2: {
                1012101: {
                    c1: "杭州",
                    c2: {
                        99150: {
                            b1: "滨江"
                        },
                        99151: {
                            b1: "朝晖五区"
                        },
                        99152: {
                            b1: "城厢镇"
                        },
                        99153: {
                            b1: "和睦小学"
                        },
                        99154: {
                            b1: "临平镇"
                        },
                        99155: {
                            b1: "千岛湖"
                        },
                        99156: {
                            b1: "卧龙桥"
                        },
                        99157: {
                            b1: "西溪"
                        },
                        99158: {
                            b1: "下沙"
                        },
                        99159: {
                            b1: "浙江农大"
                        },
                        99160: {
                            b1: "云栖"
                        }
                    }
                },
                1012110: {
                    c1: "衢州",
                    c2: {
                        99295: {
                            b1: "环保大楼"
                        },
                        99296: {
                            b1: "衢州学院"
                        },
                        99297: {
                            b1: "实验学校"
                        }
                    }
                },
                1012105: {
                    c1: "绍兴",
                    c2: {
                        99308: {
                            b1: "城东开发委"
                        },
                        99309: {
                            b1: "袍江站"
                        },
                        99310: {
                            b1: "市环保站"
                        }
                    }
                },
                1012107: {
                    c1: "温州",
                    c2: {
                        99390: {
                            b1: "龙湾"
                        },
                        99391: {
                            b1: "南浦"
                        },
                        99392: {
                            b1: "瓯海"
                        },
                        99393: {
                            b1: "市站"
                        }
                    }
                },
                1012108: {
                    c1: "丽水",
                    c2: {
                        99239: {
                            b1: "监测站大楼"
                        },
                        99240: {
                            b1: "莲都小学"
                        },
                        99241: {
                            b1: "余庄前"
                        }
                    }
                },
                1012102: {
                    c1: "湖州",
                    c2: {
                        99192: {
                            b1: "城北水厂"
                        },
                        99193: {
                            b1: "城西水厂"
                        },
                        99194: {
                            b1: "吉山新村"
                        }
                    }
                },
                1012111: {
                    c1: "舟山",
                    c2: {
                        99498: {
                            b1: "定海檀枫"
                        },
                        99499: {
                            b1: "临城新区"
                        },
                        99500: {
                            b1: "普陀东港"
                        }
                    }
                },
                1012103: {
                    c1: "嘉兴",
                    c2: {
                        99199: {
                            b1: "清河小学"
                        },
                        99200: {
                            b1: "嘉兴学院"
                        },
                        99201: {
                            b1: "监测站"
                        }
                    }
                },
                1012104: {
                    c1: "宁波",
                    c2: {
                        99273: {
                            b1: "龙赛医院"
                        },
                        99274: {
                            b1: "钱湖水厂"
                        },
                        99275: {
                            b1: "区环保大楼"
                        },
                        99276: {
                            b1: "三江中学"
                        },
                        99277: {
                            b1: "市政管理站"
                        },
                        99278: {
                            b1: "太古小学"
                        },
                        99279: {
                            b1: "万里学院"
                        },
                        99280: {
                            b1: "市环境监测中心"
                        }
                    }
                },
                1012109: {
                    c1: "义乌",
                    c2: {
                        99893: {
                            b1: "江东"
                        },
                        99894: {
                            b1: "北苑"
                        }
                    }
                },
                1012109: {
                    c1: "金华",
                    c2: {
                        99210: {
                            b1: "监测站"
                        },
                        99211: {
                            b1: "十五中"
                        },
                        99212: {
                            b1: "四中"
                        }
                    }
                },
                1012101: {
                    c1: "临安",
                    c2: {
                        99785: {
                            b1: "市政府"
                        },
                        99786: {
                            b1: "四中"
                        }
                    }
                },
                1012105: {
                    c1: "诸暨",
                    c2: {
                        99926: {
                            b1: "图书馆"
                        },
                        99927: {
                            b1: "富林印务"
                        }
                    }
                },
                1012106: {
                    c1: "台州",
                    c2: {
                        99362: {
                            b1: "黄岩环保大楼"
                        },
                        99363: {
                            b1: "路桥田洋王"
                        },
                        99364: {
                            b1: "台州环保大楼"
                        }
                    }
                },
                1012101: {
                    c1: "富阳",
                    c2: {
                        99715: {
                            b1: "监测站"
                        },
                        99716: {
                            b1: "富春二小"
                        }
                    }
                }
            }
        },
        10122: {
            t1: "安徽",
            t2: {
                1012203: {
                    c1: "芜湖",
                    c2: {
                        99872: {
                            b1: "监测站"
                        },
                        99873: {
                            b1: "科创中心"
                        },
                        99874: {
                            b1: "四水厂"
                        },
                        99875: {
                            b1: "五七二零厂"
                        }
                    }
                },
                1012205: {
                    c1: "马鞍山",
                    c2: {
                        99800: {
                            b1: "湖东路四小"
                        },
                        99801: {
                            b1: "天平服装"
                        },
                        99802: {
                            b1: "慈湖二小"
                        },
                        99803: {
                            b1: "马钢动力厂"
                        },
                        99804: {
                            b1: "市教育基地"
                        }
                    }
                },
                1012201: {
                    c1: "合肥",
                    c2: {
                        99161: {
                            b1: "包河区"
                        },
                        99162: {
                            b1: "滨湖新区"
                        },
                        99163: {
                            b1: "董铺水库"
                        },
                        99164: {
                            b1: "琥珀山庄"
                        },
                        99165: {
                            b1: "庐阳区"
                        },
                        99166: {
                            b1: "明珠广场"
                        },
                        99167: {
                            b1: "三里街"
                        },
                        99168: {
                            b1: "瑶海区"
                        },
                        99169: {
                            b1: "长江中路"
                        },
                        99170: {
                            b1: "高新区"
                        }
                    }
                }
            }
        },
        10123: {
            t1: "福建",
            t2: {
                1012305: {
                    c1: "泉州",
                    c2: {
                        99665: {
                            b1: "清源山"
                        },
                        99666: {
                            b1: "涂山街"
                        },
                        99667: {
                            b1: "津头埔"
                        },
                        99668: {
                            b1: "万安"
                        }
                    }
                },
                1012302: {
                    c1: "厦门",
                    c2: {
                        99419: {
                            b1: "溪东"
                        },
                        99420: {
                            b1: "鼓浪屿"
                        },
                        99421: {
                            b1: "洪文"
                        },
                        99422: {
                            b1: "湖里"
                        }
                    }
                },
                1012301: {
                    c1: "福州",
                    c2: {
                        99102: {
                            b1: "鼓山"
                        },
                        99103: {
                            b1: "快安"
                        },
                        99104: {
                            b1: "师大"
                        },
                        99105: {
                            b1: "五四北路"
                        },
                        99106: {
                            b1: "杨桥西路"
                        },
                        99107: {
                            b1: "紫阳"
                        }
                    }
                }
            }
        },
        10124: {
            t1: "江西",
            t2: {
                1012402: {
                    c1: "九江",
                    c2: {
                        99762: {
                            b1: "十里"
                        },
                        99763: {
                            b1: "茅山头"
                        },
                        99764: {
                            b1: "五七二七厂"
                        },
                        99765: {
                            b1: "水科所"
                        },
                        99766: {
                            b1: "综合工业园"
                        },
                        99767: {
                            b1: "石化总厂"
                        },
                        99768: {
                            b1: "庐山气象台"
                        },
                        99942: {
                            b1: "西园"
                        }
                    }
                },
                1012401: {
                    c1: "南昌",
                    c2: {
                        99242: {
                            b1: "建工学校"
                        },
                        99243: {
                            b1: "京东镇政府"
                        },
                        99244: {
                            b1: "林科所"
                        },
                        99245: {
                            b1: "省林业公司"
                        },
                        99246: {
                            b1: "省外办"
                        },
                        99247: {
                            b1: "石化"
                        },
                        99248: {
                            b1: "武术学校"
                        },
                        99249: {
                            b1: "象湖"
                        },
                        99250: {
                            b1: "省站"
                        }
                    }
                }
            }
        },
        10125: {
            t1: "湖南",
            t2: {
                1012501: {
                    c1: "长沙",
                    c2: {
                        99031: {
                            b1: "经开区环保局"
                        },
                        99032: {
                            b1: "高开区环保局"
                        },
                        99033: {
                            b1: "马坡岭"
                        },
                        99034: {
                            b1: "湖南师范大学"
                        },
                        99035: {
                            b1: "雨花区环保局"
                        },
                        99036: {
                            b1: "伍家岭"
                        },
                        99037: {
                            b1: "火车新站"
                        },
                        99038: {
                            b1: "天心区环保局"
                        },
                        99039: {
                            b1: "湖南中医药大学"
                        },
                        99040: {
                            b1: "沙坪"
                        }
                    }
                },
                1012510: {
                    c1: "岳阳",
                    c2: {
                        99897: {
                            b1: "南湖风景区"
                        },
                        99898: {
                            b1: "城陵矶"
                        },
                        99899: {
                            b1: "开发区"
                        },
                        99900: {
                            b1: "云溪区"
                        },
                        99901: {
                            b1: "君山区"
                        },
                        99902: {
                            b1: "金凤水库"
                        }
                    }
                },
                1012502: {
                    c1: "湘潭",
                    c2: {
                        99436: {
                            b1: "板塘"
                        },
                        99437: {
                            b1: "江麓"
                        },
                        99438: {
                            b1: "市监测站"
                        },
                        99439: {
                            b1: "岳塘"
                        },
                        99440: {
                            b1: "科大"
                        },
                        99441: {
                            b1: "韶山"
                        },
                        99442: {
                            b1: "昭山"
                        }
                    }
                },
                1012503: {
                    c1: "株洲",
                    c2: {
                        99505: {
                            b1: "大京风景区"
                        },
                        99506: {
                            b1: "火车站"
                        },
                        99507: {
                            b1: "市监测站"
                        },
                        99508: {
                            b1: "市四中"
                        },
                        99509: {
                            b1: "天台山庄"
                        },
                        99510: {
                            b1: "株冶医院"
                        },
                        99939: {
                            b1: "云田中学"
                        }
                    }
                },
                1012506: {
                    c1: "常德",
                    c2: {
                        99690: {
                            b1: "市监测站"
                        },
                        99691: {
                            b1: "市二中"
                        },
                        99692: {
                            b1: "鼎城区环保局"
                        },
                        99693: {
                            b1: "市技术监督局"
                        },
                        99694: {
                            b1: "百合山"
                        }
                    }
                },
                1012511: {
                    c1: "张家界",
                    c2: {
                        99908: {
                            b1: "永定新区"
                        },
                        99909: {
                            b1: "电业局"
                        },
                        99910: {
                            b1: "未央路"
                        },
                        99911: {
                            b1: "袁家界"
                        }
                    }
                }
            }
        },
        10126: {
            t1: "贵州",
            t2: {
                1012602: {
                    c1: "遵义",
                    c2: {
                        99932: {
                            b1: "丁字口"
                        },
                        99933: {
                            b1: "凤凰山"
                        },
                        99934: {
                            b1: "忠庄"
                        },
                        99935: {
                            b1: "舟水桥"
                        },
                        99936: {
                            b1: "干田坝"
                        }
                    }
                },
                1012601: {
                    c1: "贵阳",
                    c2: {
                        99119: {
                            b1: "马鞍山"
                        },
                        99120: {
                            b1: "鸿边门"
                        },
                        99121: {
                            b1: "花溪区"
                        },
                        99122: {
                            b1: "金阳新区"
                        },
                        99123: {
                            b1: "市环保站"
                        },
                        99124: {
                            b1: "太慈桥"
                        },
                        99125: {
                            b1: "桐木岭"
                        },
                        99126: {
                            b1: "乌当区"
                        },
                        99127: {
                            b1: "小河区"
                        },
                        99128: {
                            b1: "冶金厅"
                        },
                        99937: {
                            b1: "金阳区"
                        }
                    }
                }
            }
        },
        10127: {
            t1: "四川",
            t2: {
                1012702: {
                    c1: "攀枝花",
                    c2: {
                        99827: {
                            b1: "弄弄坪"
                        },
                        99828: {
                            b1: "河门口"
                        },
                        99829: {
                            b1: "炳草岗"
                        },
                        99830: {
                            b1: "仁和"
                        },
                        99831: {
                            b1: "金江"
                        }
                    }
                },
                1012701: {
                    c1: "成都",
                    c2: {
                        99052: {
                            b1: "金泉两河"
                        },
                        99053: {
                            b1: "十里店"
                        },
                        99054: {
                            b1: "三瓦窑"
                        },
                        99055: {
                            b1: "沙河铺"
                        },
                        99056: {
                            b1: "梁家巷"
                        },
                        99057: {
                            b1: "草堂寺"
                        },
                        99058: {
                            b1: "人民公园"
                        },
                        99059: {
                            b1: "灵岩寺"
                        }
                    }
                },
                1012710: {
                    c1: "泸州",
                    c2: {
                        99796: {
                            b1: "九狮山"
                        },
                        99797: {
                            b1: "小市上码头"
                        },
                        99798: {
                            b1: "兰田宪桥"
                        },
                        99799: {
                            b1: "市环监站"
                        }
                    }
                },
                1012704: {
                    c1: "绵阳",
                    c2: {
                        99812: {
                            b1: "富乐山"
                        },
                        99813: {
                            b1: "市人大"
                        },
                        99814: {
                            b1: "高新区自来水公司"
                        },
                        99815: {
                            b1: "三水厂"
                        }
                    }
                },
                1012711: {
                    c1: "宜宾",
                    c2: {
                        99882: {
                            b1: "石马中学"
                        },
                        99883: {
                            b1: "市委"
                        },
                        99884: {
                            b1: "宜宾四中"
                        },
                        99885: {
                            b1: "市政府"
                        },
                        99886: {
                            b1: "黄金嘴"
                        },
                        99887: {
                            b1: "沙坪中学"
                        }
                    }
                },
                1012720: {
                    c1: "德阳",
                    c2: {
                        99705: {
                            b1: "东山公园"
                        },
                        99706: {
                            b1: "西小区"
                        },
                        99707: {
                            b1: "市检察院"
                        },
                        99708: {
                            b1: "耐火材料厂"
                        }
                    }
                },
                1012705: {
                    c1: "南充",
                    c2: {
                        99821: {
                            b1: "西山风景区"
                        },
                        99822: {
                            b1: "南充市委"
                        },
                        99823: {
                            b1: "南充炼油厂"
                        },
                        99824: {
                            b1: "高坪区监测站"
                        },
                        99825: {
                            b1: "嘉陵区环保局"
                        },
                        99826: {
                            b1: "市环境监测站"
                        }
                    }
                },
                1012703: {
                    c1: "自贡",
                    c2: {
                        99928: {
                            b1: "大塘山"
                        },
                        99929: {
                            b1: "盐马路"
                        },
                        99930: {
                            b1: "檀木林街"
                        },
                        99931: {
                            b1: "春华路"
                        }
                    }
                }
            }
        },
        10128: {
            t1: "广东",
            t2: {
                1012814: {
                    c1: "云浮",
                    c2: {
                        99903: {
                            b1: "新市府"
                        },
                        99904: {
                            b1: "市监测站"
                        },
                        99905: {
                            b1: "牧羊"
                        }
                    }
                },
                1012803: {
                    c1: "惠州",
                    c2: {
                        99187: {
                            b1: "河南岸金山湖子站"
                        },
                        99188: {
                            b1: "江北云山西路子站"
                        },
                        99189: {
                            b1: "下埔横江三路子站"
                        },
                        99190: {
                            b1: "大亚湾管委会子站"
                        },
                        99191: {
                            b1: "惠阳区承修路船湖子站"
                        }
                    }
                },
                1012811: {
                    c1: "江门",
                    c2: {
                        99195: {
                            b1: "北街"
                        },
                        99196: {
                            b1: "东湖"
                        },
                        99197: {
                            b1: "圭峰西"
                        },
                        99198: {
                            b1: "西区"
                        }
                    }
                },
                1012812: {
                    c1: "河源",
                    c2: {
                        99557: {
                            b1: "市自来水厂"
                        },
                        99558: {
                            b1: "市三小"
                        },
                        99559: {
                            b1: "河源中学"
                        }
                    }
                },
                1012806: {
                    c1: "深圳",
                    c2: {
                        99322: {
                            b1: "洪湖"
                        },
                        99323: {
                            b1: "华侨城"
                        },
                        99324: {
                            b1: "荔园"
                        },
                        99325: {
                            b1: "龙岗"
                        },
                        99326: {
                            b1: "南澳"
                        },
                        99327: {
                            b1: "南油"
                        },
                        99328: {
                            b1: "西乡"
                        },
                        99329: {
                            b1: "盐田"
                        },
                        99330: {
                            b1: "观澜"
                        },
                        99331: {
                            b1: "葵涌"
                        },
                        99332: {
                            b1: "梅沙"
                        }
                    }
                },
                1012819: {
                    c1: "揭阳",
                    c2: {
                        99736: {
                            b1: "东湖公园"
                        },
                        99737: {
                            b1: "仙滘"
                        },
                        99738: {
                            b1: "中长"
                        },
                        99739: {
                            b1: "渔湖初级中学"
                        }
                    }
                },
                1012820: {
                    c1: "茂名",
                    c2: {
                        99805: {
                            b1: "市环保局茂港分局"
                        },
                        99806: {
                            b1: "茂石化七小"
                        },
                        99807: {
                            b1: "健康路"
                        },
                        99808: {
                            b1: "高岭"
                        }
                    }
                },
                1012808: {
                    c1: "佛山",
                    c2: {
                        99094: {
                            b1: "高明孔堂"
                        },
                        99095: {
                            b1: "华材职中"
                        },
                        99096: {
                            b1: "南海气象局"
                        },
                        99097: {
                            b1: "容桂街道办"
                        },
                        99098: {
                            b1: "顺德苏岗"
                        },
                        99099: {
                            b1: "湾梁"
                        },
                        99100: {
                            b1: "三水监测站"
                        },
                        99101: {
                            b1: "三水云东海"
                        }
                    }
                },
                1012809: {
                    c1: "肇庆",
                    c2: {
                        99477: {
                            b1: "城中子站"
                        },
                        99478: {
                            b1: "坑口子站"
                        },
                        99479: {
                            b1: "睦岗子站"
                        },
                        99480: {
                            b1: "七星岩子站"
                        }
                    }
                },
                1012817: {
                    c1: "中山",
                    c2: {
                        99494: {
                            b1: "华柏园"
                        },
                        99495: {
                            b1: "张溪"
                        },
                        99496: {
                            b1: "长江旅游区"
                        },
                        99497: {
                            b1: "紫马岭"
                        }
                    }
                },
                1012802: {
                    c1: "韶关",
                    c2: {
                        99651: {
                            b1: "市八中"
                        },
                        99652: {
                            b1: "碧湖山庄"
                        },
                        99653: {
                            b1: "园林处"
                        },
                        99654: {
                            b1: "韶关学院"
                        },
                        99655: {
                            b1: "曲江监测站"
                        }
                    }
                },
                1012813: {
                    c1: "清远",
                    c2: {
                        99669: {
                            b1: "环保局"
                        },
                        99670: {
                            b1: "凤城街办"
                        },
                        99671: {
                            b1: "扶贫区"
                        }
                    }
                },
                1012810: {
                    c1: "湛江",
                    c2: {
                        99914: {
                            b1: "湛江影剧院"
                        },
                        99915: {
                            b1: "市环境监测站"
                        },
                        99916: {
                            b1: "环保局宿舍"
                        },
                        99917: {
                            b1: "霞山游泳场"
                        },
                        99918: {
                            b1: "麻章区环保局"
                        },
                        99919: {
                            b1: "坡头区环保局"
                        }
                    }
                },
                1012821: {
                    c1: "汕尾",
                    c2: {
                        99857: {
                            b1: "市环保局"
                        },
                        99858: {
                            b1: "市政府"
                        },
                        99859: {
                            b1: "新城中学"
                        }
                    }
                },
                1012801: {
                    c1: "广州",
                    c2: {
                        99108: {
                            b1: "广雅中学"
                        },
                        99109: {
                            b1: "市五中"
                        },
                        99110: {
                            b1: "番禺中学"
                        },
                        99111: {
                            b1: "广东商学院"
                        },
                        99112: {
                            b1: "花都师范"
                        },
                        99113: {
                            b1: "九龙镇镇龙"
                        },
                        99114: {
                            b1: "麓湖"
                        },
                        99115: {
                            b1: "帽峰山森林公园"
                        },
                        99116: {
                            b1: "市八十六中"
                        },
                        99117: {
                            b1: "市监测站"
                        },
                        99118: {
                            b1: "天河职幼"
                        }
                    }
                },
                1012807: {
                    c1: "珠海",
                    c2: {
                        99501: {
                            b1: "斗门"
                        },
                        99502: {
                            b1: "吉大"
                        },
                        99503: {
                            b1: "前山"
                        },
                        99504: {
                            b1: "唐家"
                        }
                    }
                },
                1012818: {
                    c1: "阳江",
                    c2: {
                        99879: {
                            b1: "鸳鸯湖"
                        },
                        99880: {
                            b1: "南恩路"
                        },
                        99881: {
                            b1: "马南垌"
                        }
                    }
                },
                1012805: {
                    c1: "汕头",
                    c2: {
                        99656: {
                            b1: "金平子站"
                        },
                        99657: {
                            b1: "龙湖子站"
                        },
                        99658: {
                            b1: "潮阳子站"
                        },
                        99659: {
                            b1: "潮南子站"
                        },
                        99660: {
                            b1: "濠江子站"
                        },
                        99661: {
                            b1: "澄海子站"
                        }
                    }
                },
                1012815: {
                    c1: "潮州",
                    c2: {
                        99698: {
                            b1: "西园路"
                        },
                        99699: {
                            b1: "档案局"
                        },
                        99700: {
                            b1: "市政公司"
                        }
                    }
                },
                1012804: {
                    c1: "梅州",
                    c2: {
                        99809: {
                            b1: "嘉应大学"
                        },
                        99810: {
                            b1: "梅县新城"
                        },
                        99811: {
                            b1: "环境监控中心"
                        }
                    }
                },
                1012816: {
                    c1: "东莞",
                    c2: {
                        99089: {
                            b1: "实验中学"
                        },
                        99090: {
                            b1: "东城石井"
                        },
                        99091: {
                            b1: "莞城二水厂"
                        },
                        99092: {
                            b1: "南城西平"
                        },
                        99093: {
                            b1: "南城元岭"
                        }
                    }
                }
            }
        },
        10129: {
            t1: "云南",
            t2: {
                1012901: {
                    c1: "昆明",
                    c2: {
                        99213: {
                            b1: "碧鸡广场"
                        },
                        99214: {
                            b1: "呈贡新区"
                        },
                        99215: {
                            b1: "东风东路"
                        },
                        99216: {
                            b1: "关上"
                        },
                        99217: {
                            b1: "金鼎山"
                        },
                        99218: {
                            b1: "西山森林公园"
                        },
                        99219: {
                            b1: "龙泉镇"
                        }
                    }
                },
                1012904: {
                    c1: "曲靖",
                    c2: {
                        99845: {
                            b1: "环境监测站"
                        },
                        99846: {
                            b1: "烟厂办公区"
                        }
                    }
                },
                1012907: {
                    c1: "玉溪",
                    c2: {
                        99605: {
                            b1: "东风水库"
                        },
                        99606: {
                            b1: "市监测站"
                        },
                        99607: {
                            b1: "大营街镇"
                        }
                    }
                }
            }
        },
        10130: {
            t1: "广西",
            t2: {
                1013005: {
                    c1: "桂林",
                    c2: {
                        99717: {
                            b1: "电子科大尧山校区"
                        },
                        99718: {
                            b1: "监测站"
                        },
                        99719: {
                            b1: "龙隐路小学"
                        },
                        99720: {
                            b1: "八中"
                        }
                    }
                },
                1013001: {
                    c1: "南宁",
                    c2: {
                        99260: {
                            b1: "北湖"
                        },
                        99261: {
                            b1: "大自然花园"
                        },
                        99262: {
                            b1: "区农职院"
                        },
                        99263: {
                            b1: "沙井镇街道办"
                        },
                        99264: {
                            b1: "市监测站"
                        },
                        99265: {
                            b1: "仙葫"
                        },
                        99266: {
                            b1: "英华嘉园"
                        },
                        99267: {
                            b1: "振宁花园"
                        }
                    }
                },
                1013013: {
                    c1: "北海",
                    c2: {
                        99524: {
                            b1: "牛尾岭水库"
                        },
                        99525: {
                            b1: "海滩公园"
                        },
                        99526: {
                            b1: "新市环保局"
                        },
                        99527: {
                            b1: "北海工业园"
                        }
                    }
                },
                1013003: {
                    c1: "柳州",
                    c2: {
                        99585: {
                            b1: "柳东小学"
                        },
                        99586: {
                            b1: "环保监测站"
                        },
                        99587: {
                            b1: "河西水厂"
                        },
                        99588: {
                            b1: "市四中"
                        },
                        99589: {
                            b1: "市九中"
                        },
                        99590: {
                            b1: "古亭山"
                        }
                    }
                }
            }
        },
        10131: {
            t1: "海南",
            t2: {
                1013101: {
                    c1: "海口",
                    c2: {
                        99141: {
                            b1: "东寨港"
                        },
                        99142: {
                            b1: "海南大学"
                        },
                        99143: {
                            b1: "海南师范大学"
                        },
                        99144: {
                            b1: "龙华路环保局宿舍"
                        },
                        99145: {
                            b1: "秀英海南医院"
                        }
                    }
                },
                1013102: {
                    c1: "三亚",
                    c2: {
                        99855: {
                            b1: "河东子站"
                        },
                        99856: {
                            b1: "河西子站"
                        }
                    }
                }
            }
        }
    };
    return a
});
