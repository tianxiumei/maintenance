import React from "react";
import { computed } from "mobx";
import BasicComponent from "components/BasicComponent";
import { observer } from "mobx-react";
import { Table } from "antd";
import Modal from "components/Base/Modal";

interface IReportModalProps {
  dataSource: any;
  onCancel: () => void;
}

@observer
export default class ReportDetail extends BasicComponent<
  IReportModalProps,
  any
> {
  @computed
  get columns() {
    return [
      {
        title: "编码",
        dataIndex: "proCode",
        key: "proCode",
        width: 80,
        fixed: "left",
      },
      {
        title: "项目名称",
        dataIndex: "proName",
        key: "proName",
        width: 100,
        fixed: "left",
      },
      {
        title: "项目标志",
        children: [
          {
            title: "重点工程标志",
            dataIndex: "keyMark",
            key: "keyMark",
            width: 150,
          },
          {
            title: "节能环保标志",
            dataIndex: "energysavingMark",
            key: "energysavingMark",
            width: 150,
          },
        ],
      },
      {
        title: "项目年月",
        children: [
          {
            title: "项目开建年月",
            dataIndex: "startDate",
            key: "startDate",
            width: 150,
          },
          {
            title: "项目投产年月",
            dataIndex: "productDate",
            key: "productDate",
            width: 150,
          },
        ],
      },
      {
        title: "项目投资统计(万元)",
        children: [
          {
            title: "总投资统计",
            children: [
              {
                title: "计划总投资",
                dataIndex: "plantotalInvest",
                key: "plantotalInvest",
                width: 150,
              },
              {
                title: "自开建至本年累计完成投资",
                dataIndex: "stotalInvest",
                key: "stotalInvest",
                width: 150,
              },
            ],
          },
          {
            title: "年度计划投资统计",
            children: [
              {
                title: "本年计划投资",
                dataIndex: "yplanInvest",
                key: "yplanInvest",
                width: 150,
              },
              {
                title: "自年初累计完成投资",
                dataIndex: "ytotalInvest",
                key: "ytotalInvest",
                width: 150,
              },
            ],
          },
          {
            title: "按构成分",
            children: [
              {
                title: "（一）建筑工程",
                dataIndex: "construction",
                key: "construction",
                width: 150,
              },
              {
                title: "（二）安装工程",
                dataIndex: "installation",
                key: "installation",
                width: 150,
              },
              {
                title: "（三）设备购置",
                dataIndex: "toolsPurchase",
                key: "toolsPurchase",
                width: 150,
              },
              {
                title: "（四）其他费用",
                dataIndex: "otherCost",
                key: "otherCost",
                width: 150,
              },
            ],
          },
          {
            title: "按用途分",
            children: [
              {
                title: "（一）农林渔牧业",
                dataIndex: "NLYM",
                key: "NLYM",
                width: 150,
              },
              {
                title: "（二）工业建筑业",
                dataIndex: "GYJZ",
                key: "GYJZ",
                width: 150,
              },
              {
                title: "（三）商业运输业",
                dataIndex: "SYYS",
                key: "SYYS",
                width: 150,
              },
              {
                title: "(四）住宅",
                dataIndex: "ZZ",
                key: "ZZ",
                width: 150,
              },
              {
                title: "(五）其他",
                dataIndex: "QT",
                key: "QT",
                width: 150,
              },
            ],
          },
        ],
      },
      {
        title: "面积统计(平方米)",
        children: [
          {
            title: "施工面积",
            children: [
              {
                title: "总共（值为数据表的施工面积）",
                dataIndex: "constructionArea",
                key: "constructionArea",
                width: 200,
              },
              {
                title: "住宅（值为数据表的住宅（施工））",
                dataIndex: "houseCon",
                key: "houseCon",
                width: 200,
              },
            ],
          },
          {
            title: "竣工面积",
            children: [
              {
                title: "总共（值为数据表的竣工面积）",
                dataIndex: "completesArea",
                key: "completesArea",
                width: 200,
              },
              {
                title: "住宅（值为数据表的住宅（竣工））",
                dataIndex: "houseCom",
                key: "houseCom",
                width: 200,
              },
            ],
          },
        ],
      },
      {
        title: "价值统计",
        children: [
          {
            title: "自年初累计完成房屋投资",
            dataIndex: "houseTotalInvest",
            key: "houseTotalInvest",
            width: 150,
          },
          {
            title: "自年初累计完成房屋竣工价值",
            dataIndex: "houseComInvest",
            key: "houseComInvest",
            width: 200,
          },
          {
            title: "自年初累计新增固定资产",
            dataIndex: "newFixedAsset",
            key: "newFixedAsset",
            width: 200,
          },
          {
            title: "固定资产分类",
            children: [
              {
                title: "累计新增生产性固定资产",
                dataIndex: "productiveAsset",
                key: "productiveAsset",
                width: 200,
              },
              {
                title: "累计完成不增加固定资产投资",
                dataIndex: "noproductiveInvest",
                key: "noproductiveInvest",
                width: 200,
              },
            ],
          },
          {
            title: "本年底未完成工程累计完成投资",
            dataIndex: "incompleteInvest",
            key: "incompleteInvest",
            width: 200,
          },
        ],
      },
      {
        title: "工作量统计",
        children: [
          {
            title: "本年施工规模",
            dataIndex: "yearSize",
            key: "yearSize",
            width: 200,
          },
          {
            title: "历年累计新增",
            dataIndex: "cumIncrease",
            key: "cumIncrease",
            width: 200,
          },
          {
            title: "本年新增",
            dataIndex: "yearIncrease",
            key: "yearIncrease",
            width: 200,
          },
          {
            title: "自年初累计完成其他实物工作量",
            dataIndex: "doneOtherWork",
            key: "doneOtherWork",
            width: 200,
          },
          {
            title: "用途划分（万元)",
            children: [
              {
                title: "增产",
                dataIndex: "increaseProduction",
                key: "increaseProduction",
                width: 200,
              },
              {
                title: "节约能源",
                dataIndex: "energySaving",
                key: "energySaving",
                width: 200,
              },
              {
                title: "其他节约",
                dataIndex: "otherSaving",
                key: "otherSaving",
                width: 200,
              },
              {
                title: "增加品种",
                dataIndex: "addBreed",
                key: "addBreed",
                width: 200,
              },
              {
                title: "提高产品质量",
                dataIndex: "increaseQuality",
                key: "increaseQuality",
                width: 200,
              },
              {
                title: "三废治理",
                dataIndex: "sfzl",
                key: "sfzl",
                width: 200,
              },
              {
                title: "其他",
                dataIndex: "others",
                key: "others",
                width: 200,
              },
            ],
          },
        ],
      },
      {
        title: "能力编码",
        dataIndex: "abilityCode",
        key: "abilityCode",
        width: 100,
      },
      {
        title: "计算单位",
        dataIndex: "countUnit",
        key: "countUnit",
        width: 100,
      },
      {
        title: "设计能力",
        dataIndex: "designAbility",
        key: "designAbility",
        width: 100,
      },
      {
        title: "形象进度",
        dataIndex: "imageProgress",
        key: "imageProgress",
        width: 100,
      },
      {
        title: "项目批号",
        dataIndex: "proNumber",
        key: "proNumber",
        width: 100,
      },
      {
        title: "资金来源",
        dataIndex: "fundSource",
        key: "fundSource",
        width: 100,
      },
      {
        title: "记录时间",
        dataIndex: "recordDate",
        key: "recordDate",
        width: 130,
        fixed: "right",
      },
    ];
  }

  render() {
    return (
      <Modal
        width={1300}
        footer={null}
        visible={true}
        onCancel={this.props.onCancel}
      >
        <div className="report">
          <Table
            columns={this.columns as any}
            dataSource={this.props.dataSource || []}
            emptyText="暂无数据"
            scroll={{ x: "calc(700px + 50%)", y: 700 }}
            bordered
            size="large"
          />
        </div>
      </Modal>
    );
  }
}
