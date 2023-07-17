/***设备联系***/
/**
 *
 * @param d
 * @returns {string}
 */
export const getNodeSelfPath = d => {
  if(d.relation.lineNumber === 1) {
    return "M" + (d.target.x + 25) + " " + (d.target.y - 10) + " C " + (d.target.x + 125) + " " + (d.target.y - 60)
      + "," + (d.target.x + 125) + " " + (d.target.y + 60) + "," + (d.target.x + 30) + " " + (d.target.y+ 10);
  }
  if(d.relation.lineNumber === 2) {
    return "M" + (d.target.x - 10) + " " + (d.target.y - 25) + " C " + (d.target.x - 60) + " " + (d.target.y - 125)
      + "," + (d.target.x + 60) + " " + (d.target.y - 125) + "," + (d.target.x + 10) + " " + (d.target.y - 30);
  }
  if(d.relation.lineNumber === 3) {
    return "M" + (d.target.x - 25) + " " + (d.target.y + 10) + " C " + (d.target.x - 125) + " " + (d.target.y + 60)
      + "," + (d.target.x - 125) + " " + (d.target.y - 60) + "," + (d.target.x - 30) + " " + (d.target.y - 10);
  }
  if(d.relation.lineNumber === 4) {
    return "M" + (d.target.x + 10) + " " + (d.target.y + 25) + " C " + (d.target.x + 60) + " " + (d.target.y + 125)
      + "," + (d.target.x - 60) + " " + (d.target.y + 125) + "," + (d.target.x - 10) + " " + (d.target.y + 30);
  }
};

export const getNodesLine = d => {
  console.log(d)
  d.sourceRadius = 26;
  d.targetRadius = 31;
  let tan = Math.abs((d.target.y - d.source.y) / (d.target.x - d.source.x)); //圆心连线tan值
  let x1 = d.target.x - d.source.x > 0 ? Math.sqrt(d.sourceRadius * d.sourceRadius / (tan * tan + 1)) + d.source.x :
    d.source.x - Math.sqrt(d.sourceRadius * d.sourceRadius / (tan * tan + 1)); //起点x坐标
  let y1 = d.target.y - d.source.y > 0 ? Math.sqrt(d.sourceRadius * d.sourceRadius * tan * tan / (tan * tan + 1)) + d.source.y :
    d.source.y - Math.sqrt(d.sourceRadius * d.sourceRadius * tan * tan / (tan * tan + 1)); //起点y坐标
  let x2 = d.target.x - d.source.x > 0 ? d.target.x - Math.sqrt(d.targetRadius * d.targetRadius / (1 + tan * tan)) :
    d.target.x + Math.sqrt(d.targetRadius * d.targetRadius / (1 + tan * tan));//终点x坐标
  let y2 = d.target.y - d.source.y > 0 ? d.target.y - Math.sqrt(d.targetRadius * d.targetRadius * tan * tan / (1 + tan * tan)) :
    d.target.y + Math.sqrt(d.targetRadius * d.targetRadius * tan * tan / (1 + tan * tan));//终点y坐标
  if (d.target.x - d.source.x === 0 || tan === 0) { //斜率无穷大的情况或为0时
    y1 = d.target.y - d.source.y > 0 ? d.source.y + d.sourceRadius : d.source.y - d.sourceRadius;
    y2 = d.target.y - d.source.y > 0 ? d.target.y - d.targetRadius : d.target.y + d.targetRadius;
  }
  if (d.linknum === 0) {//设置编号为0的连接线为直线，其他连接线会均分在两边
    console.log('🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍')
    d.x_start = x1;
    d.y_start = y1;
    d.x_end = x2;
    d.y_end = y2;
    return 'M' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2;
  }
  let a = d.sourceRadius > d.targetRadius ? d.targetRadius * d.linknum / 3 : d.sourceRadius * d.linknum / 3;
  let xm = d.target.x - d.source.x > 0 ? d.source.x + Math.sqrt((d.sourceRadius * d.sourceRadius - a * a) / (1 + tan * tan)) :
    d.source.x - Math.sqrt((d.sourceRadius * d.sourceRadius - a * a) / (1 + tan * tan));
  let ym = d.target.y - d.source.y > 0 ? d.source.y + Math.sqrt((d.sourceRadius * d.sourceRadius - a * a) * tan * tan / (1 + tan * tan)) :
    d.source.y - Math.sqrt((d.sourceRadius * d.sourceRadius - a * a) * tan * tan / (1 + tan * tan));
  let xn = d.target.x - d.source.x > 0 ? d.target.x - Math.sqrt((d.targetRadius * d.targetRadius - a * a) / (1 + tan * tan)) :
    d.target.x + Math.sqrt((d.targetRadius * d.targetRadius - a * a) / (1 + tan * tan));
  let yn = d.target.y - d.source.y > 0 ? d.target.y - Math.sqrt((d.targetRadius * d.targetRadius - a * a) * tan * tan / (1 + tan * tan)) :
    d.target.y + Math.sqrt((d.targetRadius * d.targetRadius - a * a) * tan * tan / (1 + tan * tan));
  if (d.target.x - d.source.x === 0 || tan === 0) {//斜率无穷大或为0时
    ym = d.target.y - d.source.y > 0 ? d.source.y + Math.sqrt(d.sourceRadius * d.sourceRadius - a * a) : d.source.y - Math.sqrt(d.sourceRadius * d.sourceRadius - a * a);
    yn = d.target.y - d.source.y > 0 ? d.target.y - Math.sqrt(d.targetRadius * d.targetRadius - a * a) : d.target.y + Math.sqrt(d.targetRadius * d.targetRadius - a * a);
  }

  let k = (x1 - x2) / (y2 - y1);//连线垂线的斜率
  let dx = Math.sqrt(a * a / (1 + k * k)); //相对垂点x轴距离
  let dy = Math.sqrt(a * a * k * k / (1 + k * k)); //相对垂点y轴距离
  if ((y2 - y1) === 0) {
    dx = 0;
    dy = Math.sqrt(a * a);
  }
  let xs,ys,xt,yt;
  if (a > 0) {
     xs = k > 0 ? xm - dx : xm + dx;
     ys = ym - dy;
     xt = k > 0 ? xn - dx : xn + dx;
     yt = yn - dy;
  } else {
     xs = k > 0 ? xm + dx : xm - dx;
     ys = ym + dy;
     xt = k > 0 ? xn + dx : xn - dx;
     yt = yn + dy;
  }

  //记录连线起始和终止坐标，用于定位线上文字
  d.x_start = xs;
  d.y_start = ys;
  d.x_end = xt;
  d.y_end = yt;

  //return 'M' + xs + ' ' + ys + "L" +  + xt + ' ' + yt;//绘制直线
  let NodesDistance = Math.sqrt(Math.pow(d.source.x - d.target.x, 2) + Math.pow(d.source.y - d.target.y, 2));
  let rad = 200;
  if(300 >= NodesDistance && NodesDistance > 150) {
    rad = 300
  } else if(450 >= NodesDistance && NodesDistance > 300) {
    rad = 400
  } else if (600 >= NodesDistance && NodesDistance > 450) {
    rad = 500
  } else if (750 >= NodesDistance && NodesDistance > 600) {
    rad = 600
  } else if (900 >= NodesDistance && NodesDistance > 750) {
    rad = 700
  } else if (1050 >= NodesDistance && NodesDistance > 900) {
    rad = 800
  } else if (1200 >= NodesDistance && NodesDistance > 1050) {
    rad = 900
  }

  if(d.source.x < d.target.x){//绘制曲线
    if(d.linknum < 0) {
      return "M" + xs + "," + ys + "A" + rad + "," + rad + " 0 0,0 " + xt + "," + yt;
    }else {
      return "M" + xs + "," + ys + "A" + rad + "," + rad + " 0 0,1 " + xt + "," + yt;
    }
  } else {
    if(d.linknum < 0) {
      return "M" + xs + "," + ys + "A" + rad + "," + rad + " 0 0,1 " + xt + "," + yt;
    }else {
      return "M" + xs + "," + ys + "A" + rad + "," + rad + " 0 0,0 " + xt + "," + yt;
    }
  }
};

export const setLinkNumber = (group) => {
  if (group.length === 0) return;
  if (group.length === 1) {
    group[0].linknum = 0;
    return;
  }
  let maxLinkNumber = group.length % 2 === 0 ? group.length / 2 : (group.length - 1) / 2;
  if (group.length % 2 === 0) {
    let startLinkNum = -maxLinkNumber + 0.5;
    for (let i = 0; i < group.length; i++) {
      group[i].linknum = startLinkNum++;
    }
  } else {
    let startLinkNum = -maxLinkNumber;
    for (let i = 0; i < group.length; i++) {
      group[i].linknum = startLinkNum++;
    }
  }
};

export const setLinkGroup = links => {
  let linkGroup = {};
  //对连接线进行统计和分组，不区分连接线的方向，只要属于同两个实体，即认为是同一组
  let linkmap = {};
  for (let i = 0; i < links.length; i++) {
    let key = links[i].source < links[i].target ? links[i].source + ':' + links[i].target : links[i].target + ':' + links[i].source;
    if (!linkmap.hasOwnProperty(key)) {
      linkmap[key] = 0;
    }
    linkmap[key] += 1;
    if (!linkGroup.hasOwnProperty(key)) {
      linkGroup[key] = [];
    }
    linkGroup[key].push(links[i]);
  }
  //为每一条连接线分配size属性，同时对每一组连接线进行编号
  for (let i = 0; i < links.length; i++) {
    let key = links[i].source < links[i].target ? links[i].source + ':' + links[i].target : links[i].target + ':' + links[i].source;
    links[i].size = linkmap[key];
    //同一组的关系进行编号
    let group = linkGroup[key];
    //给节点分配编号
    setLinkNumber(group);
  }

};




