// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "ali_openid": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "apple_openid": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "avatar": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "头像地址",
    "label": "头像地址"
  },
  "avatar_file": {
    "rules": [
      {
        "format": "file"
      }
    ],
    "title": "头像文件",
    "label": "头像文件"
  },
  "comment": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "备注",
    "label": "备注"
  },
  "dcloud_appid": {
    "rules": [
      {
        "format": "array"
      }
    ]
  },
  "department_id": {
    "rules": [
      {
        "format": "array"
      }
    ],
    "title": "部门",
    "label": "部门"
  },
  "email": {
    "rules": [
      {
        "format": "string"
      },
      {
        "format": "email"
      }
    ],
    "title": "邮箱",
    "label": "邮箱"
  },
  "email_confirmed": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "未验证",
            "value": 0
          },
          {
            "text": "已验证",
            "value": 1
          }
        ]
      }
    ],
    "title": "邮箱验证状态",
    "defaultValue": 0,
    "label": "邮箱验证状态"
  },
  "gender": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "未知",
            "value": 0
          },
          {
            "text": "男",
            "value": 1
          },
          {
            "text": "女",
            "value": 2
          }
        ]
      }
    ],
    "title": "性别",
    "defaultValue": 0,
    "label": "性别"
  },
  "invite_time": {
    "rules": [
      {
        "format": "timestamp"
      }
    ]
  },
  "inviter_uid": {
    "rules": [
      {
        "format": "array"
      }
    ]
  },
  "last_login_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ]
  },
  "last_login_ip": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "mobile": {
    "rules": [
      {
        "format": "string"
      },
      {
        "pattern": "^\\+?[0-9-]{3,20}$"
      }
    ],
    "title": "手机号码",
    "label": "手机号码"
  },
  "mobile_confirmed": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "未验证",
            "value": 0
          },
          {
            "text": "已验证",
            "value": 1
          }
        ]
      }
    ],
    "title": "手机号验证状态",
    "defaultValue": 0,
    "label": "手机号验证状态"
  },
  "my_invite_code": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "nickname": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "昵称",
    "label": "昵称"
  },
  "role": {
    "rules": [
      {
        "format": "array"
      }
    ],
    "title": "角色",
    "label": "角色"
  },
  "score": {
    "rules": [
      {
        "format": "int"
      }
    ]
  },
  "status": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "正常",
            "value": 0
          },
          {
            "text": "禁用",
            "value": 1
          },
          {
            "text": "审核中",
            "value": 2
          },
          {
            "text": "审核拒绝",
            "value": 3
          }
        ]
      }
    ],
    "title": "用户状态",
    "defaultValue": 0,
    "label": "用户状态"
  },
  "token": {
    "rules": [
      {
        "format": "array"
      }
    ]
  },
  "username": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "用户名",
    "label": "用户名"
  },
  "wx_unionid": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "qq_unionid": {
    "rules": [
      {
        "format": "string"
      }
    ]
  }
}

const enumConverter = {
  "email_confirmed_valuetotext": {
    "0": "未验证",
    "1": "已验证"
  },
  "gender_valuetotext": {
    "0": "未知",
    "1": "男",
    "2": "女"
  },
  "mobile_confirmed_valuetotext": {
    "0": "未验证",
    "1": "已验证"
  },
  "status_valuetotext": {
    "0": "正常",
    "1": "禁用",
    "2": "审核中",
    "3": "审核拒绝"
  }
}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
