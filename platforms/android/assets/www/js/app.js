document.addEventListener("deviceready", init, false);
function init() {   
    //创建和初始化地图函数：
    function initMap(){
      createMap();//创建地图
      setMapEvent();//设置地图事件
      addMapControl();//向地图添加控件
      addMapOverlay();//向地图添加覆盖物
      addMapData();
    }
    function createMap(){ 
      map = new BMap.Map("map"); 
      map.centerAndZoom(new BMap.Point(118.184837,24.495001),12);
    }
    function setMapEvent(){
      map.enableScrollWheelZoom();
      map.enableKeyboard();
      map.enableDragging();
      map.enableDoubleClickZoom()
    }
    function addClickHandler(target,window){
      target.addEventListener("click",function(){
        target.openInfoWindow(window);
      });
    }
    function addMapOverlay(){
    }
    //向地图添加控件
    function addMapControl(){
      var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
      scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
      map.addControl(scaleControl);
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
      map.addControl(navControl);
      var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
      map.addControl(overviewControl);
    }
    function addMapData(){
		$.ajax({
			async: false, 
			type: "post",
			url:"http://www.xmsggzxc.com/sysaspx/getmap.aspx",
			data: {keyword:"getall"},
			dataType: 'json',
			success : function(result){
				var netpoints = result.data;
 				function addMarker(maps,point,myIcon){
					var coord=point.branch_coord;
					var brandcoord=coord.split(",");
					var brandlon=brandcoord[0];
					var brandlat=brandcoord[1];
					var marker = new BMap.Marker(new BMap.Point(brandlon, brandlat),{icon:myIcon});
					marker.setTitle(point.branch_name);
					var label = new BMap.Label(point.branch_name,{"offset":new BMap.Size(13,-20)}); 
					label.setStyle({
						backgroundColor:"#fefdb1",
						borderColor:"#d4bc71",
						color:"#333",
						cursor:"pointer"
					})
					marker.setLabel(label);
					maps.addOverlay(marker);
					marker.addEventListener('click',function(){
					$.ajax({
							async: false, 
							type: "post",
							url:"http://www.xmsggzxc.com/sysaspx/getmap.aspx",
							data: {keyword:point.branch_id},
							dataType: 'json',
							success : function(detailsresult){
								var detailspoint=detailsresult.data;
								var licontent="<span style='color:#666;line-height:22px;display:block;margin-left:10px;margin-top:5px'><strong>网点编号：</strong><b style='color:#3d6dcc'>"+detailspoint.branch_id+"</b></span>";  
								licontent+="<span style='color:#666;line-height:22px;display:block;margin-left:10px'><strong>可租数量：</strong><b style='color:#3d6dcc'>"+detailspoint.can_borrow_count+"</b></span>";
								licontent+="<span style='color:#666;line-height:22px;display:block;margin-left:10px'><strong>可还数量：</strong><b style='color:#3d6dcc'>"+detailspoint.can_park_count+"</b></span>";
								var searchInfoWindow = new BMapLib.SearchInfoWindow(maps, licontent, {
									title  : "<b style='color:#333;font-weight:bold;font-size:14px;margin-left:5px'>"+detailspoint.branch_name+"</b>",//标题
									width  : 290,             //宽度
									height : 80,              //高度
									panel  : "panel",         //检索结果面板
									enableAutoPan : true,     //自动平移
									searchTypes   :[
										BMAPLIB_TAB_SEARCH,   //周边检索
										BMAPLIB_TAB_TO_HERE,  //到这里去
										BMAPLIB_TAB_FROM_HERE //从这里出发
									]
								});
								searchInfoWindow.open(marker);
							},
							error : function(){
								var opts1 = { width: 200 }; 
								var  infoWindow = new BMap.InfoWindow("获取网点实时数据失败！", opts1);
								marker.openInfoWindow(infoWindow);
							}
						});
					}); 
				}
				for(var netpoint in netpoints){
					var point = netpoints[netpoint];
					if(point.branch_coord!="0,0"&&point.branch_coord!=null)
					{
						var bcount=0;
						var cpcount=0;
						var myIcon = new BMap.Icon("js/map1.png", new BMap.Size(23, 25), {      
							offset: new BMap.Size(10, 25),    
							imageOffset: new BMap.Size(0, 0)   // 设置图片偏移    
						});
						addMarker(map,point,myIcon);
					}
				}
				netpoint = null;
			},
			error : function(){
				alert("error");
			}
		});
    }
    var map;
    initMap();


    //通过百度sdk来获取经纬度,并且alert出经纬度信息
    baidu_location.getCurrentPosition(successCallback, failedCallback);
    function successCallback(pos) {
        var p = JSON.parse(pos)
        var point = new BMap.Point(p.lontitude ,p.latitude);
        map.centerAndZoom(point,17);
        //alert(JSON.stringify(pos));
        //alert(p.lontitude+","+p.latitude);
        
        $("#msg").text("");
    }
    function failedCallback(e){
        alert(JSON.stringify(e))
    }
    
    document.querySelector("#dreamlist").addEventListener("touchend", function() {
        cordova.ThemeableBrowser.open('http://dreamlist.cc', '_blank', {
            statusbar: {
                color: '#ffffffff'
            },
            toolbar: {
                height: 0,
                color: '#f0f0f0ff'
            },
            title: {
                color: '#003264ff',
                showPageTitle: true
            },
            backButton: {
                image: 'back',
                imagePressed: 'back_pressed',
                align: 'left',
                event: 'backPressed'
            },
            forwardButton: {
                image: 'forward',
                imagePressed: 'forward_pressed',
                align: 'left',
                event: 'forwardPressed'
            },
            closeButton: {
                image: 'close',
                imagePressed: 'close_pressed',
                align: 'left',
                event: 'closePressed'
            },
            customButtons: [
                {
                    image: 'share',
                    imagePressed: 'share_pressed',
                    align: 'right',
                    event: 'sharePressed'
                }
            ],
            menu: {
                image: 'menu',
                imagePressed: 'menu_pressed',
                title: 'Test',
                cancel: 'Cancel',
                align: 'right',
                items: [
                    {
                        event: 'helloPressed',
                        label: 'Hello World!'
                    },
                    {
                        event: 'testPressed',
                        label: 'Test!'
                    }
                ]
            },
            backButtonCanClose: true
        }).addEventListener('backPressed', function(e) {
            alert('back pressed');
        }).addEventListener('helloPressed', function(e) {
            alert('hello pressed');
        }).addEventListener('sharePressed', function(e) {
            alert(e.url);
        }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
            console.error(e.message);
        }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
            console.log(e.message);
        });
    });
}