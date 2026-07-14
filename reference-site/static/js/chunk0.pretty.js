webpackJsonp([0], {
    "6+Uf": function(t, e) {},
    "9bBU": function(t, e, i) {
        i("mClu");
        var o = i("FeBl").Object;
        t.exports = function(t, e, i) {
            return o.defineProperty(t, e, i)
        }
    },
    C4MV: function(t, e, i) {
        t.exports = {
            default: i("9bBU"),
            __esModule: !0
        }
    },
    GTBP: function(t, e) {},
    MpbV: function(t, e) {},
    "N/aW": function(t, e, i) {
        "use strict";
        var o = i("Zrlr"),
            l = i.n(o),
            a = i("wxAW"),
            n = i.n(a),
            s = function() {
                function t(e) {
                    l()(this, t), this.img = e, this.width = e.width, this.height = e.height, this.scale = 1, this.x = 0, this.y = 0
                }
                return n()(t, [{
                    key: "changeScale",
                    value: function(t) {
                        (t *= 1) < .01 && (t = .01), t = Math.floor(1e4 * t) / 1e4, this.scale = t
                    }
                }, {
                    key: "drawCard",
                    value: function(t, e, i) {
                        var o = 1 * e / i,
                            l = 1 * this.width / this.height,
                            a = 0,
                            n = 0;
                        o < l ? a = (n = 1 * i * this.scale) * l : n = (a = 1 * e * this.scale) / l;
                        var s = 1 * i / 2,
                            r = 1 * e / 2 + this.x - a / 2,
                            c = s + this.y - n / 2;
                        t.clearRect(0, 0, e, i), t.drawImage(this.img, r, c, a, n)
                    }
                }]), t
            }();
        e.a = s
    },
    PxHA: function(t, e) {},
    SmEV: function(t, e) {},
    dJOF: function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = i("X2Oc"),
            l = (i("NYxO"), i("d2gY")),
            a = (i("vnWh"), i("guQW"), i("N/aW"), i("zm5D"), i("kwUQ")),
            n = i("woOf"),
            s = i.n(n),
            r = {
                data: function() {
                    return {
                        editFormVisible: !1,
                        editLoading: !1,
                        editForm: {
                            legend_id: 0,
                            country_code: "",
                            country: "",
                            name: "",
                            title: "",
                            sex: "1",
                            blood: "",
                            blood_max: "",
                            is_king: 0,
                            copyright: "",
                            id: "",
                            skills: []
                        },
                        editFormRules: {
                            name: [{
                                required: !0,
                                message: "不能为空",
                                trigger: "blur"
                            }, {
                                min: 2,
                                max: 20,
                                message: "长度在 2 到 20 个字符",
                                trigger: "blur"
                            }],
                            title: [{
                                required: !0,
                                message: "不能为空",
                                trigger: "blur"
                            }],
                            blood: [{
                                required: !0,
                                message: "不能为空",
                                trigger: "blur"
                            }]
                        },
                        input_blood_max_state: !1,
                        countryOptions: [{
                            value: "wei",
                            label: "魏"
                        }, {
                            value: "shu",
                            label: "蜀"
                        }, {
                            value: "wu",
                            label: "吴"
                        }, {
                            value: "qun",
                            label: "群"
                        }, {
                            value: "jin",
                            label: "晋"
                        }, {
                            value: "shen",
                            label: "神"
                        }]
                    }
                },
                methods: {
                    changeCountry: function() {
                        this.editForm.country = l.a.get(this.editForm.country_code)
                    },
                    changeSkillType: function(t, e) {
                        t.is_add = e
                    },
                    addSkill: function() {
                        var t = 0;
                        this.editForm.skills.length > 0 && (t = this.editForm.skills.length + 1), this.editForm.skills.push({
                            idx: t,
                            skill_name: "",
                            skill_desc: "",
                            is_add: 0
                        })
                    },
                    removeSkill: function(t) {
                        if (this.editForm.skills.splice(this.editForm.skills.findIndex(function(e) {
                                return e.idx == t
                            }), 1), this.editForm.skills.length > 0)
                            for (var e = 0; e < this.editForm.skills.length; e++) this.editForm.skills[e].idx = e
                    },
                    showMaxBlood: function() {
                        this.input_blood_max_state = !this.input_blood_max_state
                    },
                    changeBlood: function() {
                        this.editForm.blood > this.editForm.blood_max && (this.editForm.blood_max = this.editForm.blood)
                    },
                    doUpdate: function() {
                        var t = this;
                        this.$refs.editForm.validate(function(e) {
                            if (e) {
                                t.editLoading = !0;
                                var i = s()({}, t.editForm);
                                i.is_king = 1 == i.is_king ? 1 : 0, t.$http.post(API_URL.updateLegend, i).then(function(e) {
                                    t.editLoading = !1, t.editFormVisible = !1, t.$refs.editForm.resetFields(), 1 == e.success ? (t.$message.success(e.msg), t.$parent.getLegends()) : t.$message.error(e.msg)
                                })
                            }
                        })
                    }
                }
            },
            c = {
                render: function() {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("el-dialog", {
                        attrs: {
                            title: "编辑武将",
                            visible: t.editFormVisible,
                            "close-on-click-modal": !1,
                            id: "legendEditDialog",
                            width: "60%"
                        },
                        on: {
                            "update:visible": function(e) {
                                t.editFormVisible = e
                            }
                        }
                    }, [i("div", {
                        staticStyle: {
                            display: "flex",
                            "flex-direction": "row"
                        }
                    }, [i("div", {
                        staticStyle: {
                            flex: "1 1 50%"
                        }
                    }, [i("el-form", {
                        ref: "editForm",
                        attrs: {
                            model: t.editForm,
                            "label-width": "120px",
                            rules: t.editFormRules,
                            id: "editForm"
                        }
                    }, [i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "势力"
                        }
                    }, [i("el-radio-group", {
                        on: {
                            change: t.changeCountry
                        },
                        model: {
                            value: t.editForm.country_code,
                            callback: function(e) {
                                t.$set(t.editForm, "country_code", e)
                            },
                            expression: "editForm.country_code"
                        }
                    }, t._l(t.countryOptions, function(e) {
                        return i("el-radio", {
                            key: e.value,
                            staticStyle: {
                                "margin-right": "20px"
                            },
                            attrs: {
                                label: e.value
                            }
                        }, [t._v(t._s(e.label))])
                    }), 1)], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "主公"
                        }
                    }, [i("el-checkbox", {
                        attrs: {
                            checked: "1" == t.editForm.is_king,
                            label: ""
                        },
                        model: {
                            value: t.editForm.is_king,
                            callback: function(e) {
                                t.$set(t.editForm, "is_king", e)
                            },
                            expression: "editForm.is_king"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "名字"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "100px"
                        },
                        attrs: {
                            size: "mini",
                            "auto-complete": "off"
                        },
                        model: {
                            value: t.editForm.name,
                            callback: function(e) {
                                t.$set(t.editForm, "name", e)
                            },
                            expression: "editForm.name"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "称号"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "160px"
                        },
                        attrs: {
                            size: "mini",
                            "auto-complete": "off"
                        },
                        model: {
                            value: t.editForm.title,
                            callback: function(e) {
                                t.$set(t.editForm, "title", e)
                            },
                            expression: "editForm.title"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "性别"
                        }
                    }, [i("el-radio-group", {
                        model: {
                            value: t.editForm.sex,
                            callback: function(e) {
                                t.$set(t.editForm, "sex", e)
                            },
                            expression: "editForm.sex"
                        }
                    }, [i("el-radio", {
                        attrs: {
                            label: "1"
                        }
                    }, [t._v("男")]), t._v(" "), i("el-radio", {
                        attrs: {
                            label: "0"
                        }
                    }, [t._v("女")])], 1)], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "体力值"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "60px"
                        },
                        attrs: {
                            type: "number",
                            maxlength: "2",
                            min: "2",
                            max: "16",
                            size: "mini"
                        },
                        on: {
                            change: t.changeBlood
                        },
                        model: {
                            value: t.editForm.blood,
                            callback: function(e) {
                                t.$set(t.editForm, "blood", e)
                            },
                            expression: "editForm.blood"
                        }
                    }), t._v(" "), i("i", {
                        staticClass: "el-icon-view",
                        staticStyle: {
                            "font-size": "10px",
                            "margin-left": "6px",
                            "margin-right": "6px",
                            color: "#CCC"
                        },
                        on: {
                            click: function(e) {
                                return t.showMaxBlood()
                            }
                        }
                    }), t._v(" "), i("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.input_blood_max_state,
                            expression: "input_blood_max_state"
                        }],
                        staticStyle: {
                            display: "inline-block",
                            width: "240px"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "80px"
                        },
                        attrs: {
                            type: "number",
                            maxlength: "2",
                            min: "2",
                            max: "16",
                            size: "mini",
                            placeholder: "最大体力值"
                        },
                        on: {
                            change: t.changeBlood
                        },
                        model: {
                            value: t.editForm.blood_max,
                            callback: function(e) {
                                t.$set(t.editForm, "blood_max", e)
                            },
                            expression: "editForm.blood_max"
                        }
                    })], 1)], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "底部左-版权"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "160px"
                        },
                        attrs: {
                            size: "mini",
                            "auto-complete": "off"
                        },
                        model: {
                            value: t.editForm.copyright,
                            callback: function(e) {
                                t.$set(t.editForm, "copyright", e)
                            },
                            expression: "editForm.copyright"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "底部右-ID"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "160px"
                        },
                        attrs: {
                            size: "mini",
                            "auto-complete": "off"
                        },
                        model: {
                            value: t.editForm.id,
                            callback: function(e) {
                                t.$set(t.editForm, "id", e)
                            },
                            expression: "editForm.id"
                        }
                    })], 1), t._v(" "), i("div", {
                        staticStyle: {
                            width: "99%",
                            height: "1px",
                            "background-color": "#CCC",
                            "margin-top": "6px",
                            "margin-bottom": "6px",
                            "text-align": "right"
                        }
                    }), t._v(" "), i("div", {
                        staticStyle: {
                            "margin-top": "-15px",
                            "margin-left": "45%",
                            color: "#999"
                        }
                    }, [i("span", [t._v("♠")]), t._v(" "), i("span", [t._v("♥")]), t._v(" "), i("span", [t._v("♣")]), t._v(" "), i("span", [t._v("♦")])]), t._v(" "), i("div", [t._l(t.editForm.skills, function(e) {
                        return i("div", {
                            staticStyle: {
                                display: "flex",
                                "flex-direction": "row",
                                width: "98%",
                                padding: "4px 10px"
                            }
                        }, [i("div", {
                            staticStyle: {
                                flex: "0 0 70px",
                                display: "flex",
                                "align-items": "center"
                            }
                        }, [i("input", {
                            directives: [{
                                name: "model",
                                rawName: "v-model",
                                value: e.skill_name,
                                expression: "item.skill_name"
                            }],
                            staticClass: "el-input__inner",
                            staticStyle: {
                                height: "30px",
                                "line-height": "30px",
                                padding: "3px 12px",
                                "font-size": "14px"
                            },
                            attrs: {
                                type: "text",
                                maxlength: "2"
                            },
                            domProps: {
                                value: e.skill_name
                            },
                            on: {
                                input: function(i) {
                                    i.target.composing || t.$set(e, "skill_name", i.target.value)
                                }
                            }
                        }), t._v("\n               \n              "), 1 == e.is_add ? i("i", {
                            staticClass: "el-icon-unlock",
                            on: {
                                click: function(i) {
                                    return t.changeSkillType(e, 0)
                                }
                            }
                        }) : i("i", {
                            staticClass: "el-icon-lock",
                            on: {
                                click: function(i) {
                                    return t.changeSkillType(e, 1)
                                }
                            }
                        })]), t._v(" "), i("div", {
                            staticStyle: {
                                flex: "1",
                                "margin-left": "10px"
                            }
                        }, [i("textarea", {
                            directives: [{
                                name: "model",
                                rawName: "v-model",
                                value: e.skill_desc,
                                expression: "item.skill_desc"
                            }],
                            staticClass: "el-textarea__inner",
                            staticStyle: {
                                "font-size": "14px",
                                height: "76px"
                            },
                            domProps: {
                                value: e.skill_desc
                            },
                            on: {
                                input: function(i) {
                                    i.target.composing || t.$set(e, "skill_desc", i.target.value)
                                }
                            }
                        }, [t._v(t._s(e.skill_desc))])]), t._v(" "), i("div", {
                            staticStyle: {
                                flex: "0 0 30px",
                                "margin-left": "10px",
                                display: "flex",
                                "justify-content": "center",
                                "align-items": "center"
                            }
                        }, [i("i", {
                            staticClass: "el-icon-remove",
                            staticStyle: {
                                "font-size": "20px",
                                color: "#FF3300",
                                cursor: "pointer"
                            },
                            on: {
                                click: function(i) {
                                    return t.removeSkill(e.idx)
                                }
                            }
                        })])])
                    }), t._v(" "), i("div", {
                        staticStyle: {
                            display: "flex",
                            "justify-content": "flex-start",
                            "align-items": "center",
                            "margin-left": "30px",
                            height: "40px"
                        }
                    }, [i("i", {
                        staticClass: "el-icon-circle-plus",
                        staticStyle: {
                            "font-size": "20px",
                            color: "#409eff",
                            cursor: "pointer"
                        },
                        on: {
                            click: function(e) {
                                return t.addSkill()
                            }
                        }
                    })])], 2)], 1), t._v(" "), i("div", {
                        staticClass: "dialog-footer",
                        staticStyle: {
                            "text-align": "center"
                        },
                        attrs: {
                            slot: "footer"
                        },
                        slot: "footer"
                    }, [i("el-button", {
                        nativeOn: {
                            click: function(e) {
                                t.editFormVisible = !1
                            }
                        }
                    }, [t._v("取消")]), t._v(" "), i("el-button", {
                        attrs: {
                            type: "primary",
                            loading: t.editLoading
                        },
                        nativeOn: {
                            click: function(e) {
                                return t.doUpdate.apply(null, arguments)
                            }
                        }
                    }, [t._v("提交")])], 1)], 1), t._v(" "), i("div", {
                        staticStyle: {
                            flex: "1 1 50%",
                            display: "none"
                        },
                        attrs: {
                            id: "baike_skill_outer"
                        }
                    }, [i("div", {
                        staticStyle: {
                            "text-align": "center",
                            "margin-bottom": "4px",
                            color: "#666"
                        }
                    }, [t._v("技能参考")]), t._v(" "), i("table", [t._v("百度百科的技能table")])])])])
                },
                staticRenderFns: []
            };
        var d = i("VU/8")(r, c, !1, function(t) {
                i("6+Uf"), i("gmkH")
            }, "data-v-37165a1e", null).exports,
            m = {
                data: function() {
                    return {
                        addFormVisible: !1,
                        addLoading: !1,
                        addForm: {
                            legend_id: 0,
                            country_code: "wei",
                            country: "魏",
                            name: "",
                            title: "",
                            sex: "1",
                            blood: "4",
                            blood_max: "4",
                            is_king: !1,
                            copyright: "",
                            id: "",
                            skills: []
                        },
                        addFormRules: {
                            name: [{
                                required: !0,
                                message: "不能为空",
                                trigger: "blur"
                            }, {
                                min: 2,
                                max: 20,
                                message: "长度在 2 到 20 个字符",
                                trigger: "blur"
                            }],
                            title: [{
                                required: !0,
                                message: "不能为空",
                                trigger: "blur"
                            }],
                            blood: [{
                                required: !0,
                                message: "不能为空",
                                trigger: "blur"
                            }]
                        },
                        input_blood_max_state: !0,
                        countryOptions: [{
                            value: "wei",
                            label: "魏"
                        }, {
                            value: "shu",
                            label: "蜀"
                        }, {
                            value: "wu",
                            label: "吴"
                        }, {
                            value: "qun",
                            label: "群"
                        }, {
                            value: "jin",
                            label: "晋"
                        }, {
                            value: "shen",
                            label: "神"
                        }]
                    }
                },
                methods: {
                    changeCountry: function() {
                        this.addForm.country = l.a.get(this.addForm.country_code)
                    },
                    changeSkillType: function(t, e) {
                        t.is_add = e
                    },
                    addSkill: function() {
                        var t = 0;
                        this.addForm.skills.length > 0 && (t = this.addForm.skills.length + 1), this.addForm.skills.push({
                            idx: t,
                            skill_name: "",
                            skill_desc: "",
                            is_add: 0
                        })
                    },
                    removeSkill: function(t) {
                        if (this.addForm.skills.splice(this.addForm.skills.findIndex(function(e) {
                                return e.idx == t
                            }), 1), this.addForm.skills.length > 0)
                            for (var e = 0; e < this.addForm.skills.length; e++) this.addForm.skills[e].idx = e
                    },
                    showMaxBlood: function() {
                        this.input_blood_max_state = !this.input_blood_max_state
                    },
                    changeBlood: function() {
                        this.addForm.blood > this.addForm.blood_max && (this.addForm.blood_max = this.addForm.blood)
                    },
                    checkPaste: function(t, e) {
                        "" == e.skill_name && t.ctrlKey && "v" === t.key && (console.log("按下了Ctrl+V"), "：" != e.skill_desc.substr(2, 1) && ":" != e.skill_desc.substr(2, 1) || (e.skill_name = e.skill_desc.substr(0, 2), e.skill_desc = e.skill_desc.substring(3)))
                    },
                    doAdd: function() {
                        var t = this;
                        this.$refs.addForm.validate(function(e) {
                            if (e) {
                                t.addLoading = !0;
                                var i = s()({}, t.addForm);
                                i.is_king = 1 == i.is_king ? 1 : 0, t.$http.post(API_URL.addLegend, i).then(function(e) {
                                    t.addLoading = !1, t.addFormVisible = !1, t.$refs.addForm.resetFields(), 1 == e.success ? (t.$message.success(e.msg), t.$parent.getLegends()) : t.$message.error(e.msg)
                                }).catch(function(e) {
                                    t.addLoading = !1
                                })
                            }
                        })
                    }
                }
            },
            u = {
                render: function() {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("el-dialog", {
                        attrs: {
                            title: "编辑武将",
                            visible: t.addFormVisible,
                            "close-on-click-modal": !1,
                            id: "legendEditDialog"
                        },
                        on: {
                            "update:visible": function(e) {
                                t.addFormVisible = e
                            }
                        }
                    }, [i("el-form", {
                        ref: "addForm",
                        attrs: {
                            model: t.addForm,
                            "label-width": "120px",
                            rules: t.addFormRules,
                            id: "addForm"
                        }
                    }, [i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "势力"
                        }
                    }, [i("el-radio-group", {
                        on: {
                            change: t.changeCountry
                        },
                        model: {
                            value: t.addForm.country_code,
                            callback: function(e) {
                                t.$set(t.addForm, "country_code", e)
                            },
                            expression: "addForm.country_code"
                        }
                    }, t._l(t.countryOptions, function(e) {
                        return i("el-radio", {
                            key: e.value,
                            staticStyle: {
                                "margin-right": "20px"
                            },
                            attrs: {
                                label: e.value
                            }
                        }, [t._v(t._s(e.label))])
                    }), 1)], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "主公"
                        }
                    }, [i("el-checkbox", {
                        attrs: {
                            checked: "1" == t.addForm.is_king,
                            label: ""
                        },
                        model: {
                            value: t.addForm.is_king,
                            callback: function(e) {
                                t.$set(t.addForm, "is_king", e)
                            },
                            expression: "addForm.is_king"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "名字"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "100px"
                        },
                        attrs: {
                            size: "mini",
                            "auto-complete": "off"
                        },
                        model: {
                            value: t.addForm.name,
                            callback: function(e) {
                                t.$set(t.addForm, "name", e)
                            },
                            expression: "addForm.name"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "称号"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "160px"
                        },
                        attrs: {
                            size: "mini",
                            "auto-complete": "off"
                        },
                        model: {
                            value: t.addForm.title,
                            callback: function(e) {
                                t.$set(t.addForm, "title", e)
                            },
                            expression: "addForm.title"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "性别"
                        }
                    }, [i("el-radio-group", {
                        model: {
                            value: t.addForm.sex,
                            callback: function(e) {
                                t.$set(t.addForm, "sex", e)
                            },
                            expression: "addForm.sex"
                        }
                    }, [i("el-radio", {
                        attrs: {
                            label: "1"
                        }
                    }, [t._v("男")]), t._v(" "), i("el-radio", {
                        attrs: {
                            label: "0"
                        }
                    }, [t._v("女")])], 1)], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "体力值"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "60px"
                        },
                        attrs: {
                            type: "number",
                            maxlength: "2",
                            min: "2",
                            max: "16",
                            size: "mini"
                        },
                        on: {
                            change: t.changeBlood
                        },
                        model: {
                            value: t.addForm.blood,
                            callback: function(e) {
                                t.$set(t.addForm, "blood", e)
                            },
                            expression: "addForm.blood"
                        }
                    }), t._v(" "), i("i", {
                        staticClass: "el-icon-view",
                        staticStyle: {
                            "font-size": "10px",
                            "margin-left": "6px",
                            "margin-right": "6px",
                            color: "#CCC"
                        },
                        on: {
                            click: function(e) {
                                return t.showMaxBlood()
                            }
                        }
                    }), t._v(" "), i("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.input_blood_max_state,
                            expression: "input_blood_max_state"
                        }],
                        staticStyle: {
                            display: "inline-block",
                            width: "240px"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "80px"
                        },
                        attrs: {
                            type: "number",
                            maxlength: "2",
                            min: "2",
                            max: "16",
                            size: "mini",
                            placeholder: "最大体力值"
                        },
                        on: {
                            change: t.changeBlood
                        },
                        model: {
                            value: t.addForm.blood_max,
                            callback: function(e) {
                                t.$set(t.addForm, "blood_max", e)
                            },
                            expression: "addForm.blood_max"
                        }
                    })], 1)], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "底部左-版权"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "160px"
                        },
                        attrs: {
                            size: "mini",
                            "auto-complete": "off"
                        },
                        model: {
                            value: t.addForm.copyright,
                            callback: function(e) {
                                t.$set(t.addForm, "copyright", e)
                            },
                            expression: "addForm.copyright"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "0px"
                        },
                        attrs: {
                            label: "底部右-ID"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "160px"
                        },
                        attrs: {
                            size: "mini",
                            "auto-complete": "off"
                        },
                        model: {
                            value: t.addForm.id,
                            callback: function(e) {
                                t.$set(t.addForm, "id", e)
                            },
                            expression: "addForm.id"
                        }
                    })], 1), t._v(" "), i("div", {
                        staticStyle: {
                            width: "99%",
                            height: "1px",
                            "background-color": "#CCC",
                            "margin-top": "6px",
                            "margin-bottom": "6px",
                            "text-align": "right"
                        }
                    }), t._v(" "), i("div", {
                        staticStyle: {
                            "margin-top": "-15px",
                            "margin-left": "45%",
                            color: "#999"
                        }
                    }, [i("span", [t._v("♠")]), t._v(" "), i("span", [t._v("♥")]), t._v(" "), i("span", [t._v("♣")]), t._v(" "), i("span", [t._v("♦")])]), t._v(" "), i("div", [t._l(t.addForm.skills, function(e) {
                        return i("div", {
                            staticStyle: {
                                display: "flex",
                                "flex-direction": "row",
                                width: "98%",
                                padding: "4px 10px"
                            }
                        }, [i("div", {
                            staticStyle: {
                                flex: "0 0 70px",
                                display: "flex",
                                "align-items": "center"
                            }
                        }, [i("input", {
                            directives: [{
                                name: "model",
                                rawName: "v-model",
                                value: e.skill_name,
                                expression: "item.skill_name"
                            }],
                            staticClass: "el-input__inner",
                            staticStyle: {
                                height: "30px",
                                "line-height": "30px",
                                padding: "3px 12px",
                                "font-size": "14px"
                            },
                            attrs: {
                                type: "text",
                                maxlength: "2"
                            },
                            domProps: {
                                value: e.skill_name
                            },
                            on: {
                                input: function(i) {
                                    i.target.composing || t.$set(e, "skill_name", i.target.value)
                                }
                            }
                        }), t._v("\n           \n          "), 1 == e.is_add ? i("i", {
                            staticClass: "el-icon-unlock",
                            on: {
                                click: function(i) {
                                    return t.changeSkillType(e, 0)
                                }
                            }
                        }) : i("i", {
                            staticClass: "el-icon-lock",
                            on: {
                                click: function(i) {
                                    return t.changeSkillType(e, 1)
                                }
                            }
                        })]), t._v(" "), i("div", {
                            staticStyle: {
                                flex: "1",
                                "margin-left": "10px"
                            }
                        }, [i("textarea", {
                            directives: [{
                                name: "model",
                                rawName: "v-model",
                                value: e.skill_desc,
                                expression: "item.skill_desc"
                            }],
                            staticClass: "el-textarea__inner",
                            staticStyle: {
                                "font-size": "14px",
                                height: "76px"
                            },
                            domProps: {
                                value: e.skill_desc
                            },
                            on: {
                                keyup: function(i) {
                                    return t.checkPaste(i, e)
                                },
                                input: function(i) {
                                    i.target.composing || t.$set(e, "skill_desc", i.target.value)
                                }
                            }
                        }, [t._v(t._s(e.skill_desc))])]), t._v(" "), i("div", {
                            staticStyle: {
                                flex: "0 0 30px",
                                "margin-left": "10px",
                                display: "flex",
                                "justify-content": "center",
                                "align-items": "center"
                            }
                        }, [i("i", {
                            staticClass: "el-icon-remove",
                            staticStyle: {
                                "font-size": "20px",
                                color: "#FF3300",
                                cursor: "pointer"
                            },
                            on: {
                                click: function(i) {
                                    return t.removeSkill(e.idx)
                                }
                            }
                        })])])
                    }), t._v(" "), i("div", {
                        staticStyle: {
                            display: "flex",
                            "justify-content": "flex-start",
                            "align-items": "center",
                            "margin-left": "30px",
                            height: "40px"
                        }
                    }, [i("i", {
                        staticClass: "el-icon-circle-plus",
                        staticStyle: {
                            "font-size": "20px",
                            color: "#409eff",
                            cursor: "pointer"
                        },
                        on: {
                            click: function(e) {
                                return t.addSkill()
                            }
                        }
                    })])], 2)], 1), t._v(" "), i("div", {
                        staticClass: "dialog-footer",
                        attrs: {
                            slot: "footer"
                        },
                        slot: "footer"
                    }, [i("el-button", {
                        nativeOn: {
                            click: function(e) {
                                t.addFormVisible = !1
                            }
                        }
                    }, [t._v("取消")]), t._v(" "), i("el-button", {
                        attrs: {
                            type: "primary",
                            loading: t.addLoading
                        },
                        nativeOn: {
                            click: function(e) {
                                return t.doAdd.apply(null, arguments)
                            }
                        }
                    }, [t._v("提交")])], 1)], 1)
                },
                staticRenderFns: []
            };
        var p = i("VU/8")(m, u, !1, function(t) {
                i("PxHA"), i("omwA")
            }, "data-v-b85776a2", null).exports,
            g = {
                components: {
                    TopBar: a.a,
                    LegendEdit: d,
                    LegendAdd: p
                },
                data: function() {
                    return {
                        loading: !1,
                        pars: {
                            filter: {
                                country: "-1",
                                is_king: "-1",
                                name: "",
                                blood: "",
                                has_awake_skill_num: ""
                            },
                            page: 1,
                            page_size: 10,
                            order_field: "pinyin",
                            order_type: "asc"
                        },
                        selectLegendIDS: [],
                        countryOptions: [{
                            value: "-1",
                            label: "全部"
                        }, {
                            value: "魏",
                            label: "魏"
                        }, {
                            value: "蜀",
                            label: "蜀"
                        }, {
                            value: "吴",
                            label: "吴"
                        }, {
                            value: "群",
                            label: "群"
                        }, {
                            value: "晋",
                            label: "晋"
                        }, {
                            value: "神",
                            label: "神"
                        }],
                        kingOptions: [{
                            value: "-1",
                            label: "全部"
                        }, {
                            value: "0",
                            label: "普通"
                        }, {
                            value: "1",
                            label: "主公"
                        }],
                        importDialogState: !1,
                        importDataType: null == localStorage.getItem("import_data_type") ? "1" : localStorage.getItem("import_data_type"),
                        importData: "",
                        legends: [],
                        legends_total: 0
                    }
                },
                created: function() {
                    this.$store.state.app.listPagePars.has(this.$route.path) && (this.pars = this.$store.state.app.listPagePars.get(this.$route.path)), this.getLegends()
                },
                methods: {
                    getLegends: function() {
                        var t = this;
                        this.loading = !0, this.$store.dispatch("saveListPagePars", {
                            path: this.$route.path,
                            pars: this.pars
                        }), this.$http.get(API_URL.getLegends, {
                            params: this.pars
                        }).then(function(e) {
                            t.loading = !1, 200 == e.code && (t.legends = e.data, t.legends_total = parseInt(e.total))
                        })
                    },
                    pageChange: function(t) {
                        this.pars.page = t, this.getLegends()
                    },
                    showEdit: function(t) {
                        console.log(t), this.$refs.dialog_edit.editFormVisible = !0, this.$refs.dialog_edit.editForm = Object(o.a)(this.$refs.dialog_edit.editForm, t)
                    },
                    showAdd: function() {
                        this.$refs.dialog_add.addFormVisible = !0
                    },
                    selectRow: function(t) {
                        var e = this;
                        this.selectLegendIDS = [], t.length > 0 && t.forEach(function(t) {
                            e.selectLegendIDS.push(t.legend_id)
                        }), console.log(this.selectLegendIDS)
                    },
                    deleteLegends: function() {
                        var t = this;
                        this.$confirm("确定删除选中的武将?", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        }).then(function() {
                            if (0 != t.selectLegendIDS.length) {
                                var e = {
                                    legend_ids: t.selectLegendIDS
                                };
                                t.$http.post(API_URL.deleteLegends, e).then(function(e) {
                                    1 == e.success ? (t.$message.success(e.msg), t.getLegends()) : t.$message.error(e.msg)
                                })
                            }
                        }).catch(function() {})
                    },
                    rowStyle: function(t, e) {
                        return "魏" == t.row.country ? {
                            "background-color": "#DDEEFF"
                        } : "蜀" == t.row.country ? {
                            "background-color": "#FFDDEE"
                        } : "吴" == t.row.country ? {
                            "background-color": "#DDFFEE"
                        } : "群" == t.row.country ? {
                            "background-color": "#ECECEC"
                        } : "晋" == t.row.country ? {
                            "background-color": "#FFFFDD"
                        } : void 0
                    },
                    countryStyle: function(t) {
                        switch (t) {
                            case "魏":
                                return "color: #4A87EB";
                            case "蜀":
                                return "color: #F30000";
                            case "吴":
                                return "color: #82D048";
                            case "群":
                                return "color: #666";
                            case "晋":
                                return "color: #C300FF";
                            case "神":
                                return "color: #FFC900";
                            default:
                                return "color: #666"
                        }
                    },
                    saveImportDataType: function() {
                        localStorage.setItem("import_data_type", this.importDataType)
                    },
                    showImportCon: function() {
                        document.getElementById("importCon").style.height = window.innerHeight + "px", this.importDialogState = !0
                    },
                    hideImportCon: function() {
                        this.importDialogState = !1
                    },
                    loadData: function() {
                        var t = this;
                        Object(o.i)(this.importData) ? this.hideImportCon() : (this.loading = !0, this.$http.post(API_URL.importLegends, {
                            type: this.importDataType,
                            str: this.importData
                        }).then(function(e) {
                            t.loading = !1, e.code, t.$message({
                                message: e.msg,
                                type: "success",
                                duration: 1500
                            }), t.importData = "", t.importDialogState = !1, t.getLegends()
                        }).catch(function(e) {
                            t.$message(e), console.log(e)
                        }))
                    }
                }
            },
            f = {
                render: function() {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", [i("top-bar", {
                        attrs: {
                            menuIndex: "2"
                        }
                    }), t._v(" "), i("el-row", {
                        staticStyle: {
                            "margin-top": "8px",
                            "margin-left": "8px"
                        }
                    }, [i("el-col", {
                        attrs: {
                            span: 24
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "160px"
                        },
                        attrs: {
                            placeholder: "武将名",
                            size: "mini"
                        },
                        nativeOn: {
                            keyup: function(e) {
                                return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : t.getLegends.apply(null, arguments)
                            }
                        },
                        model: {
                            value: t.pars.filter.name,
                            callback: function(e) {
                                t.$set(t.pars.filter, "name", e)
                            },
                            expression: "pars.filter.name"
                        }
                    }), t._v(" "), i("el-select", {
                        attrs: {
                            placeholder: "选择势力",
                            size: "mini"
                        },
                        model: {
                            value: t.pars.filter.country,
                            callback: function(e) {
                                t.$set(t.pars.filter, "country", e)
                            },
                            expression: "pars.filter.country"
                        }
                    }, t._l(t.countryOptions, function(t) {
                        return i("el-option", {
                            key: t.value,
                            attrs: {
                                label: t.label,
                                value: t.value
                            }
                        })
                    }), 1), t._v(" "), i("el-select", {
                        attrs: {
                            placeholder: "是否主公",
                            size: "mini"
                        },
                        model: {
                            value: t.pars.filter.is_king,
                            callback: function(e) {
                                t.$set(t.pars.filter, "is_king", e)
                            },
                            expression: "pars.filter.is_king"
                        }
                    }, t._l(t.kingOptions, function(t) {
                        return i("el-option", {
                            key: t.value,
                            attrs: {
                                label: t.label,
                                value: t.value
                            }
                        })
                    }), 1), t._v(" "), i("el-button", {
                        attrs: {
                            type: "primary",
                            size: "mini",
                            loading: t.loading
                        },
                        on: {
                            click: t.getLegends
                        }
                    }, [t._v("搜索")]), t._v(" "), i("el-button", {
                        attrs: {
                            type: "danger",
                            size: "mini",
                            loading: t.loading
                        },
                        on: {
                            click: t.deleteLegends
                        }
                    }, [t._v("删除")]), t._v(" "), i("el-button", {
                        attrs: {
                            type: "primary",
                            size: "mini"
                        },
                        on: {
                            click: t.showImportCon
                        }
                    }, [t._v("导入")]), t._v(" "), i("el-button", {
                        attrs: {
                            type: "primary",
                            size: "mini"
                        },
                        on: {
                            click: t.showAdd
                        }
                    }, [t._v("添加")])], 1)], 1), t._v(" "), i("el-row", {
                        staticStyle: {
                            "margin-left": "8px"
                        }
                    }, [i("el-table", {
                        directives: [{
                            name: "loading",
                            rawName: "v-loading",
                            value: t.loading,
                            expression: "loading"
                        }],
                        staticStyle: {
                            width: "100%"
                        },
                        attrs: {
                            data: t.legends
                        },
                        on: {
                            "selection-change": t.selectRow
                        }
                    }, [i("el-table-column", {
                        attrs: {
                            type: "selection",
                            width: "55"
                        }
                    }), t._v(" "), i("el-table-column", {
                        attrs: {
                            prop: "name",
                            label: "名字",
                            width: "180"
                        }
                    }), t._v(" "), i("el-table-column", {
                        attrs: {
                            prop: "title",
                            label: "称号",
                            width: "180"
                        }
                    }), t._v(" "), i("el-table-column", {
                        attrs: {
                            prop: "country",
                            label: "势力"
                        },
                        scopedSlots: t._u([{
                            key: "default",
                            fn: function(e) {
                                return [i("span", {
                                    style: t.countryStyle(e.row.country)
                                }, [t._v(t._s(e.row.country))])]
                            }
                        }])
                    }), t._v(" "), i("el-table-column", {
                        attrs: {
                            prop: "is_king",
                            label: "主公"
                        },
                        scopedSlots: t._u([{
                            key: "default",
                            fn: function(e) {
                                return [1 == e.row.is_king ? i("span", [i("i", {
                                    staticClass: "el-icon-check"
                                })]) : t._e()]
                            }
                        }])
                    }), t._v(" "), i("el-table-column", {
                        attrs: {
                            prop: "blood",
                            label: "体力值"
                        },
                        scopedSlots: t._u([{
                            key: "default",
                            fn: function(e) {
                                return [i("span", [t._v(t._s(e.row.blood))]), t._v(" "), e.row.blood != e.row.blood_max ? i("span", [t._v(" - " + t._s(e.row.blood_max))]) : t._e()]
                            }
                        }])
                    }), t._v(" "), i("el-table-column", {
                        attrs: {
                            prop: "skill_num",
                            label: "技能数"
                        }
                    }), t._v(" "), i("el-table-column", {
                        attrs: {
                            fixed: "right",
                            label: "操作",
                            width: "100"
                        },
                        scopedSlots: t._u([{
                            key: "default",
                            fn: function(e) {
                                return [i("el-button", {
                                    attrs: {
                                        type: "text",
                                        size: "mini"
                                    },
                                    on: {
                                        click: function(i) {
                                            return t.showEdit(e.row)
                                        }
                                    }
                                }, [t._v("编辑")])]
                            }
                        }])
                    })], 1)], 1), t._v(" "), i("el-row", {
                        staticStyle: {
                            "margin-left": "8px",
                            "margin-top": "8px"
                        }
                    }, [i("el-pagination", {
                        attrs: {
                            background: "",
                            layout: "total, prev, pager, next",
                            "current-page": t.pars.page,
                            size: t.pars.page_size,
                            total: t.legends_total
                        },
                        on: {
                            "current-change": t.pageChange,
                            "update:currentPage": function(e) {
                                return t.$set(t.pars, "page", e)
                            },
                            "update:current-page": function(e) {
                                return t.$set(t.pars, "page", e)
                            }
                        }
                    })], 1), t._v(" "), i("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.importDialogState,
                            expression: "importDialogState"
                        }],
                        staticStyle: {
                            display: "none",
                            position: "absolute",
                            "z-index": "9",
                            width: "100%",
                            height: "900px",
                            left: "0",
                            top: "0",
                            "padding-left": "10%",
                            "padding-top": "10%",
                            background: "url('/static/alert_bg.png') repeat"
                        },
                        attrs: {
                            id: "importCon"
                        },
                        on: {
                            click: t.hideImportCon
                        }
                    }, [i("div", {
                        staticStyle: {
                            "background-color": "#FFFFFF",
                            width: "80%",
                            padding: "10px"
                        },
                        attrs: {
                            onclick: "event.stopPropagation();"
                        }
                    }, [i("div", [t._v("从excel复制数据并粘贴到下面\n        "), i("el-tooltip", {
                        attrs: {
                            placement: "top"
                        }
                    }, [i("div", {
                        attrs: {
                            slot: "content"
                        },
                        slot: "content"
                    }, [i("img", {
                        attrs: {
                            src: "/static/copy_excel_demo2.png"
                        }
                    })]), t._v(" "), i("el-link", {
                        attrs: {
                            type: "warning"
                        }
                    }, [t._v("查看示例")])], 1)], 1), t._v(" "), i("div", [i("div", {
                        staticStyle: {
                            "margin-top": "6px"
                        }
                    }, [i("el-radio", {
                        attrs: {
                            label: "1"
                        },
                        on: {
                            change: function(e) {
                                return t.saveImportDataType()
                            }
                        },
                        model: {
                            value: t.importDataType,
                            callback: function(e) {
                                t.importDataType = e
                            },
                            expression: "importDataType"
                        }
                    }, [t._v("简易 - 列头：名字 称号 体力值 势力 技能1 技能2 技能3（技能：技能描述）")])], 1), t._v(" "), i("div", {
                        staticStyle: {
                            "margin-top": "6px"
                        }
                    }, [i("el-radio", {
                        attrs: {
                            label: "2"
                        },
                        on: {
                            change: function(e) {
                                return t.saveImportDataType()
                            }
                        },
                        model: {
                            value: t.importDataType,
                            callback: function(e) {
                                t.importDataType = e
                            },
                            expression: "importDataType"
                        }
                    }, [t._v("详细 - 列头：名字 称号 体力值 势力 "), i("i", {
                        staticStyle: {
                            color: "#FF3300"
                        }
                    }, [t._v("版本号 编号")]), t._v(" 技能1 技能2 技能3（技能：技能描述）")])], 1)]), t._v(" "), i("textarea", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.importData,
                            expression: "importData"
                        }],
                        staticClass: "el-textarea__inner",
                        staticStyle: {
                            width: "90%",
                            height: "400px",
                            "margin-top": "10px",
                            "margin-bottom": "10px"
                        },
                        attrs: {
                            id: "content",
                            placeholder: "粘贴excel数据到这里"
                        },
                        domProps: {
                            value: t.importData
                        },
                        on: {
                            input: function(e) {
                                e.target.composing || (t.importData = e.target.value)
                            }
                        }
                    }), t._v(" "), i("el-button", {
                        attrs: {
                            type: "primary",
                            size: "mini"
                        },
                        on: {
                            click: t.loadData
                        }
                    }, [t._v("导入")]), t._v(" "), i("el-button", {
                        attrs: {
                            type: "primary",
                            size: "mini"
                        },
                        on: {
                            click: t.hideImportCon
                        }
                    }, [t._v("关闭")])], 1)]), t._v(" "), i("legend-edit", {
                        ref: "dialog_edit"
                    }), t._v(" "), i("legend-add", {
                        ref: "dialog_add"
                    })], 1)
                },
                staticRenderFns: []
            };
        var _ = i("VU/8")(g, f, !1, function(t) {
            i("GTBP")
        }, "data-v-78938d0f", null);
        e.default = _.exports
    },
    fkU4: function(t, e) {},
    gmkH: function(t, e) {},
    jgBo: function(t, e) {},
    kwUQ: function(t, e, i) {
        "use strict";
        var o = i("woOf"),
            l = i.n(o),
            a = {
                components: {},
                data: function() {
                    var t = /^1[3|4|5|7|8][0-9]\d{8}$/;
                    return {
                        dialogLoginVisible: !1,
                        loading: !1,
                        formLogin: {
                            mobile: null == localStorage.getItem("mobile") ? "" : localStorage.getItem("mobile"),
                            user_pwd: null == localStorage.getItem("user_pwd") ? "" : localStorage.getItem("user_pwd")
                        },
                        formLoginRules: {
                            mobile: [{
                                required: !0,
                                message: "不能为空",
                                trigger: "blur"
                            }, {
                                min: 11,
                                max: 11,
                                validator: function(e, i, o) {
                                    i ? t.test(i) ? o() : o(new Error("请输入正确的11位手机号码")) : o(new Error("请输入电话号码"))
                                },
                                trigger: "blur"
                            }],
                            user_pwd: [{
                                required: !0,
                                message: "不能为空",
                                trigger: "blur"
                            }]
                        }
                    }
                },
                methods: {
                    doLogin: function() {
                        var t = this;
                        this.$refs.formLogin.validate(function(e) {
                            if (!e) return !1;
                            t.loginInAction()
                        })
                    },
                    loginInAction: function() {
                        var t = this;
                        this.loading = !0;
                        var e = l()({}, this.formLogin);
                        this.$store.dispatch("loginIn", e).then(function(e) {
                            t.loading = !1, 200 == e.code ? (t.dialogLoginVisible = !1, t.$message({
                                message: e.msg,
                                type: "success",
                                duration: 1e3
                            }), localStorage.setItem("mobile", t.formLogin.mobile), localStorage.setItem("user_pwd", t.formLogin.user_pwd), location.reload()) : t.$message.error(e.msg)
                        })
                    }
                }
            },
            n = {
                render: function() {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("el-dialog", {
                        attrs: {
                            title: "登录",
                            visible: t.dialogLoginVisible,
                            "close-on-click-modal": !1
                        },
                        on: {
                            "update:visible": function(e) {
                                t.dialogLoginVisible = e
                            }
                        }
                    }, [i("el-form", {
                        ref: "formLogin",
                        attrs: {
                            model: t.formLogin,
                            "label-width": "120px",
                            rules: t.formLoginRules
                        }
                    }, [i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "30px"
                        },
                        attrs: {
                            label: "手机号",
                            prop: "mobile",
                            autocomplete: "on"
                        }
                    }, [i("el-input", {
                        attrs: {
                            "auto-complete": "on"
                        },
                        model: {
                            value: t.formLogin.mobile,
                            callback: function(e) {
                                t.$set(t.formLogin, "mobile", e)
                            },
                            expression: "formLogin.mobile"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "30px"
                        },
                        attrs: {
                            label: "密码",
                            prop: "user_pwd"
                        }
                    }, [i("el-input", {
                        attrs: {
                            "show-password": ""
                        },
                        model: {
                            value: t.formLogin.user_pwd,
                            callback: function(e) {
                                t.$set(t.formLogin, "user_pwd", e)
                            },
                            expression: "formLogin.user_pwd"
                        }
                    })], 1)], 1), t._v(" "), i("div", {
                        staticClass: "dialog-footer",
                        attrs: {
                            slot: "footer"
                        },
                        slot: "footer"
                    }, [i("el-button", {
                        nativeOn: {
                            click: function(e) {
                                t.dialogLoginVisible = !1
                            }
                        }
                    }, [t._v("取消")]), t._v(" "), i("el-button", {
                        attrs: {
                            type: "primary",
                            loading: t.loading
                        },
                        nativeOn: {
                            click: function(e) {
                                return t.doLogin.apply(null, arguments)
                            }
                        }
                    }, [t._v("提交")])], 1)], 1)
                },
                staticRenderFns: []
            };
        var s = {
                components: {},
                data: function() {
                    var t = this,
                        e = /^1[3|4|5|7|8][0-9]\d{8}$/;
                    return {
                        dialogRegisterVisible: !1,
                        loading: !1,
                        modelRegisterForm: {
                            mobile: "",
                            user_pwd: "",
                            user_pwd2: "",
                            nick_name: ""
                        },
                        formRegisterRules: {
                            mobile: [{
                                required: !0,
                                message: "不能为空",
                                trigger: "blur"
                            }, {
                                min: 11,
                                max: 11,
                                validator: function(t, i, o) {
                                    i ? e.test(i) ? o() : o(new Error("请输入正确的11位手机号码")) : o(new Error("请输入电话号码"))
                                },
                                trigger: "blur"
                            }],
                            user_pwd: [{
                                required: !0,
                                message: "不能为空",
                                trigger: "blur"
                            }],
                            user_pwd2: [{
                                required: !0,
                                message: "不能为空",
                                trigger: "blur"
                            }, {
                                required: !0,
                                validator: function(e, i, o) {
                                    "" === i ? o(new Error("请再次输入密码")) : i !== t.modelRegisterForm.user_pwd ? o(new Error("两次输入密码不一致!")) : o()
                                },
                                rigger: "blur"
                            }],
                            nick_name: [{
                                required: !0,
                                message: "不能为空",
                                trigger: "blur"
                            }, {
                                min: 2,
                                max: 20,
                                message: "长度2-20个字符",
                                trigger: "blur"
                            }]
                        }
                    }
                },
                methods: {
                    doRegister: function() {
                        var t = this;
                        this.$refs.formRegister.validate(function(e) {
                            if (!e) return !1;
                            t.registerAction()
                        })
                    },
                    registerAction: function() {
                        var t = this;
                        localStorage.setItem("mobile", this.modelRegisterForm.mobile), this.loading = !0;
                        var e = l()({}, this.modelRegisterForm);
                        this.$store.dispatch("register", e).then(function(e) {
                            t.loading = !1, 200 == e.code ? t.loginOK(e) : t.$message.error(e.msg)
                        })
                    },
                    loginOK: function(t) {
                        localStorage.setItem("mobile", this.modelRegisterForm.mobile), this.$message({
                            message: t.msg,
                            type: "success",
                            duration: 1e3
                        }), this.dialogRegisterVisible = !1
                    }
                }
            },
            r = {
                render: function() {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("el-dialog", {
                        attrs: {
                            title: "注册",
                            visible: t.dialogRegisterVisible,
                            "close-on-click-modal": !1
                        },
                        on: {
                            "update:visible": function(e) {
                                t.dialogRegisterVisible = e
                            }
                        }
                    }, [i("el-form", {
                        ref: "formRegister",
                        attrs: {
                            model: t.modelRegisterForm,
                            "label-width": "120px",
                            rules: t.formRegisterRules
                        }
                    }, [i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "30px"
                        },
                        attrs: {
                            label: "手机号",
                            prop: "mobile"
                        }
                    }, [i("el-input", {
                        attrs: {
                            "auto-complete": "on"
                        },
                        model: {
                            value: t.modelRegisterForm.mobile,
                            callback: function(e) {
                                t.$set(t.modelRegisterForm, "mobile", e)
                            },
                            expression: "modelRegisterForm.mobile"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "30px"
                        },
                        attrs: {
                            label: "密码",
                            prop: "user_pwd"
                        }
                    }, [i("el-input", {
                        attrs: {
                            "show-password": ""
                        },
                        model: {
                            value: t.modelRegisterForm.user_pwd,
                            callback: function(e) {
                                t.$set(t.modelRegisterForm, "user_pwd", e)
                            },
                            expression: "modelRegisterForm.user_pwd"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "30px"
                        },
                        attrs: {
                            label: "确认密码",
                            prop: "user_pwd2"
                        }
                    }, [i("el-input", {
                        attrs: {
                            "show-password": ""
                        },
                        model: {
                            value: t.modelRegisterForm.user_pwd2,
                            callback: function(e) {
                                t.$set(t.modelRegisterForm, "user_pwd2", e)
                            },
                            expression: "modelRegisterForm.user_pwd2"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "30px"
                        },
                        attrs: {
                            label: "昵称",
                            prop: "nick_name"
                        }
                    }, [i("el-input", {
                        model: {
                            value: t.modelRegisterForm.nick_name,
                            callback: function(e) {
                                t.$set(t.modelRegisterForm, "nick_name", e)
                            },
                            expression: "modelRegisterForm.nick_name"
                        }
                    })], 1), t._v(" "), i("div", [i("p", [t._v("说明：")]), t._v(" "), i("p", [t._v("1、所有访客都可以使用武将卡牌制作功能。")]), t._v(" "), i("p", [t._v("2、注册登录用户，可使用临时导入武将信息功能，一次导入多个武将信息，但信息不保留。")]), t._v(" "), i("p", [t._v("3、高级用户，可使用导入武将信息功能，并管理自己的武将信息，武将信息保存在账号下。")])])], 1), t._v(" "), i("div", {
                        staticClass: "dialog-footer",
                        attrs: {
                            slot: "footer"
                        },
                        slot: "footer"
                    }, [i("el-button", {
                        nativeOn: {
                            click: function(e) {
                                t.dialogRegisterVisible = !1
                            }
                        }
                    }, [t._v("取消")]), t._v(" "), i("el-button", {
                        attrs: {
                            type: "primary",
                            loading: t.loading
                        },
                        nativeOn: {
                            click: function(e) {
                                return t.doRegister.apply(null, arguments)
                            }
                        }
                    }, [t._v("提交")])], 1)], 1)
                },
                staticRenderFns: []
            };
        var c = {
                components: {
                    DialogLogin: i("VU/8")(a, n, !1, function(t) {
                        i("MpbV")
                    }, "data-v-55c2f6c0", null).exports,
                    DialogRegister: i("VU/8")(s, r, !1, function(t) {
                        i("fkU4")
                    }, "data-v-2dc09cbc", null).exports
                },
                props: {
                    menuIndex: {
                        type: String,
                        default: "1"
                    }
                },
                data: function() {
                    return {
                        donateDialogVisible: !1,
                        user_id: null == sessionStorage.getItem("user_id") ? 0 : parseInt(sessionStorage.getItem("user_id")),
                        user_info: JSON.parse(sessionStorage.getItem("user_info")),
                        content: ""
                    }
                },
                mounted: function() {},
                methods: {
                    openLogin: function() {
                        this.$refs.dialog_login.dialogLoginVisible = !0
                    },
                    openRegister: function() {
                        this.$refs.dialog_register.dialogRegisterVisible = !0
                    },
                    loginOutBefore: function() {
                        var t = this;
                        this.$confirm("确定退出?", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        }).then(function() {
                            t.loginOut()
                        }).catch(function() {})
                    },
                    loginOut: function() {
                        var t = this;
                        this.$store.dispatch("loginOut").then(function(e) {
                            t.loading = !1, 200 == e.code ? (t.dialogLoginVisible = !1, t.$message({
                                message: e.msg,
                                type: "success",
                                duration: 1e3
                            })) : t.$message.error(e.msg), console.log(sessionStorage.getItem("user_id")), location.href = "/"
                        })
                    },
                    menuSelect: function(t) {
                        "1" == t ? this.$router.push({
                            path: "/"
                        }).catch(function(t) {
                            console.log(t)
                        }) : "2" == t && this.$router.push({
                            path: "/legends"
                        }).catch(function(t) {
                            console.log(t)
                        })
                    },
                    toAddress: function(t) {
                        this.$router.push({
                            path: t
                        })
                    },
                    toComment: function() {
                        location.href = "/article/1.html"
                    },
                    addMessage: function() {
                        var t = this,
                            e = {
                                user_id: this.user_id,
                                content: this.content
                            };
                        this.$http.post(API_URL.addMessage, e, e).then(function(e) {
                            t.$message({
                                type: "success",
                                dangerouslyUseHTMLString: !0,
                                message: '<img src="/gif/baoquan.gif" width="24" height="24" title="抱拳">' + e.msg
                            }), t.content = "", t.donateDialogVisible = !1
                        }).catch(function(t) {})
                    }
                }
            },
            d = {
                render: function() {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", {
                        attrs: {
                            id: "header"
                        }
                    }, [t.user_id > 0 ? [i("el-menu", {
                        staticClass: "el-menu-demo",
                        attrs: {
                            "default-active": t.menuIndex,
                            mode: "horizontal",
                            "background-color": "#545c64",
                            "text-color": "#fff",
                            "active-text-color": "#ffd04b"
                        },
                        on: {
                            select: t.menuSelect
                        }
                    }, [i("el-menu-item", {
                        attrs: {
                            index: "1"
                        }
                    }, [t._v("首页")]), t._v(" "), "1" == t.user_info.level ? [i("el-menu-item", {
                        attrs: {
                            index: "2"
                        },
                        on: {
                            click: function(e) {
                                return t.toAddress("/legends")
                            }
                        }
                    }, [t._v("我的武将")])] : t._e(), t._v(" "), i("el-menu-item", {
                        attrs: {
                            index: "3"
                        },
                        on: {
                            click: function(e) {
                                return t.toComment()
                            }
                        }
                    }, [t._v("留言")]), t._v(" "), i("el-menu-item", {
                        staticStyle: {
                            float: "right"
                        },
                        on: {
                            click: function(e) {
                                return t.loginOutBefore()
                            }
                        }
                    }, [t._v("退出")]), t._v(" "), i("el-menu-item", {
                        staticStyle: {
                            float: "right"
                        }
                    }, [t._v("欢迎 " + t._s(t.user_info.nick_name))]), t._v(" "), i("el-menu-item", {
                        staticStyle: {
                            float: "right"
                        },
                        on: {
                            click: function(e) {
                                t.donateDialogVisible = !0
                            }
                        }
                    }, [t._v("支持一下")])], 2), t._v(" "), i("dialog-login", {
                        ref: "dialog_login"
                    }), t._v(" "), i("dialog-register", {
                        ref: "dialog_register"
                    })] : [i("el-menu", {
                        staticClass: "el-menu-demo",
                        attrs: {
                            "default-active": t.menuIndex,
                            mode: "horizontal",
                            "background-color": "#545c64",
                            "text-color": "#fff",
                            "active-text-color": "#ffd04b"
                        },
                        on: {
                            select: t.menuSelect
                        }
                    }, [i("el-menu-item", {
                        attrs: {
                            index: "1"
                        }
                    }, [t._v("首页")]), t._v(" "), i("el-menu-item", {
                        staticStyle: {
                            float: "right"
                        },
                        on: {
                            click: function(e) {
                                return t.openLogin()
                            }
                        }
                    }, [t._v("登录")]), t._v(" "), i("el-menu-item", {
                        staticStyle: {
                            float: "right"
                        },
                        on: {
                            click: function(e) {
                                return t.openRegister()
                            }
                        }
                    }, [t._v("注册")]), t._v(" "), i("el-menu-item", {
                        staticStyle: {
                            float: "right"
                        },
                        on: {
                            click: function(e) {
                                t.donateDialogVisible = !0
                            }
                        }
                    }, [t._v("支持一下")])], 1), t._v(" "), i("dialog-login", {
                        ref: "dialog_login"
                    }), t._v(" "), i("dialog-register", {
                        ref: "dialog_register"
                    })], t._v(" "), i("el-dialog", {
                        attrs: {
                            title: "支持一下",
                            visible: t.donateDialogVisible,
                            width: "600px",
                            center: ""
                        },
                        on: {
                            "update:visible": function(e) {
                                t.donateDialogVisible = e
                            }
                        }
                    }, [i("img", {
                        staticStyle: {
                            width: "300px",
                            "margin-left": "20%"
                        },
                        attrs: {
                            src: "/static/weixin_pay_small.jpg"
                        }
                    }), t._v(" "), i("div", [t._v("支持完后，请给俺留言备注一下。")]), t._v(" "), i("div", {
                        staticStyle: {
                            "margin-top": "6px"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "400px"
                        },
                        attrs: {
                            size: "mini"
                        },
                        model: {
                            value: t.content,
                            callback: function(e) {
                                t.content = e
                            },
                            expression: "content"
                        }
                    }), t._v(" "), i("el-button", {
                        attrs: {
                            type: "primary",
                            size: "mini"
                        },
                        on: {
                            click: function(e) {
                                return t.addMessage()
                            }
                        }
                    }, [t._v("提交")])], 1)])], 2)
                },
                staticRenderFns: []
            };
        var m = i("VU/8")(c, d, !1, function(t) {
            i("jgBo")
        }, "data-v-056c6729", null);
        e.a = m.exports
    },
    mClu: function(t, e, i) {
        var o = i("kM2E");
        o(o.S + o.F * !i("+E39"), "Object", {
            defineProperty: i("evD5").f
        })
    },
    omwA: function(t, e) {},
    wxAW: function(t, e, i) {
        "use strict";
        e.__esModule = !0;
        var o, l = i("C4MV"),
            a = (o = l) && o.__esModule ? o : {
                default: o
            };
        e.default = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var o = e[i];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), (0, a.default)(t, o.key, o)
                }
            }
            return function(e, i, o) {
                return i && t(e.prototype, i), o && t(e, o), e
            }
        }()
    },
    zm5D: function(t, e, i) {
        "use strict";
        var o = i("woOf"),
            l = i.n(o),
            a = i("fZjL"),
            n = i.n(a),
            s = i("Dd8w"),
            r = i.n(s),
            c = i("NYxO"),
            d = {
                data: function() {
                    return {
                        settingFormVisible: !1,
                        newTagVisible: !1,
                        newTag: ""
                    }
                },
                computed: r()({}, Object(c.c)({
                    cardSizeOptions: function(t) {
                        return t.app.cardSizeOptions
                    },
                    setting: function(t) {
                        return t.app.setting
                    },
                    diy_setting: function(t) {
                        return t.app.diy_setting
                    }
                })),
                methods: {
                    reDraw: function() {
                        this.$parent.draw()
                    },
                    cardSizeArray: function() {
                        var t = this,
                            e = new Array;
                        return n()(this.cardSizeOptions).forEach(function(i) {
                            e.push(l()({
                                id: i
                            }, t.cardSizeOptions[i]))
                        }), e
                    },
                    selectSize: function() {
                        this.$parent.resizeCanvas(), this.$parent.draw()
                    },
                    doSave: function() {
                        this.$store.dispatch("saveDiySetting"), this.$message({
                            message: "保存成功",
                            type: "success"
                        }), this.settingFormVisible = !1
                    },
                    removeWord: function(t) {
                        this.diy_setting.skill.skillBoldWords.splice(this.diy_setting.skill.skillBoldWords.indexOf(t), 1), this.$parent.draw()
                    },
                    showInput: function() {
                        var t = this;
                        this.newTagVisible = !0, this.$nextTick(function(e) {
                            t.$refs.saveTagInput.$refs.input.focus()
                        })
                    },
                    newTagConfirm: function() {
                        var t = this.newTag;
                        t && this.diy_setting.skill.skillBoldWords.push(t), this.newTagVisible = !1, this.newTag = ""
                    },
                    resetSetting: function() {
                        this.diy_setting.nameSmallWords = this.$store.state.app.setting.nameSmallWords, this.diy_setting.skill = l()({}, this.$store.state.app.setting.skill), this.clearFontName(), this.clearFontTitle(), this.$parent.draw()
                    },
                    selectFontName: function() {
                        this.$refs.font_name_file.click()
                    },
                    selectFontNameFile: function() {
                        var t = this.$refs.font_name_file.files[0];
                        t && this.loadFont(t, "customFontName")
                    },
                    selectFontTitle: function() {
                        this.$refs.font_title_file.click()
                    },
                    selectFontTitleFile: function() {
                        var t = this.$refs.font_title_file.files[0];
                        t && this.loadFont(t, "customFontTitle")
                    },
                    loadFont: function(t, e) {
                        var i = this,
                            o = "custom_" + e + "_" + Date.now(),
                            l = new FileReader;
                        l.onload = function(t) {
                            var l = t.target.result,
                                a = document.createElement("style");
                            a.id = "font_" + e, a.innerHTML = "@font-face { font-family: '" + o + "'; src: url(" + l + "); }";
                            var n = document.getElementById("font_" + e);
                            n && n.remove(), document.head.appendChild(a), i.$store.state.app.diy_setting[e] = o, i.$message.success("字体加载成功"), i.$parent.draw()
                        }, l.readAsDataURL(t)
                    },
                    clearFontName: function() {
                        var t = document.getElementById("font_customFontName");
                        t && t.remove(), this.$store.state.app.diy_setting.customFontName = "", this.$refs.font_name_file.value = "", this.$parent.draw()
                    },
                    clearFontTitle: function() {
                        var t = document.getElementById("font_customFontTitle");
                        t && t.remove(), this.$store.state.app.diy_setting.customFontTitle = "", this.$refs.font_title_file.value = "", this.$parent.draw()
                    }
                }
            },
            m = {
                render: function() {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("el-dialog", {
                        attrs: {
                            title: "编辑参数",
                            visible: t.settingFormVisible,
                            "close-on-click-modal": !1,
                            width: "650px"
                        },
                        on: {
                            "update:visible": function(e) {
                                t.settingFormVisible = e
                            }
                        }
                    }, [i("el-form", {
                        ref: "settingForm",
                        attrs: {
                            "label-width": "150px"
                        }
                    }, [i("el-form-item", {
                        attrs: {
                            label: "卡片尺寸"
                        }
                    }, [i("el-select", {
                        staticStyle: {
                            width: "160px"
                        },
                        attrs: {
                            size: "mini",
                            placeholder: "请选择"
                        },
                        on: {
                            change: t.selectSize
                        },
                        model: {
                            value: t.diy_setting.cardSize,
                            callback: function(e) {
                                t.$set(t.diy_setting, "cardSize", e)
                            },
                            expression: "diy_setting.cardSize"
                        }
                    }, t._l(t.cardSizeArray(), function(t) {
                        return i("el-option", {
                            key: t.id,
                            attrs: {
                                label: t.text,
                                value: t.id
                            }
                        })
                    }), 1)], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "武将名特殊字"
                        }
                    }, [i("span", {
                        attrs: {
                            slot: "label"
                        },
                        slot: "label"
                    }, [i("el-tooltip", {
                        attrs: {
                            content: "武将名包含这些字，缩小4号",
                            placement: "top-start"
                        }
                    }, [i("label", {
                        staticStyle: {
                            "font-size": "14px"
                        }
                    }, [t._v("武将名要缩小的字 "), i("i", {
                        staticClass: "el-icon-question"
                    })])])], 1), t._v(" "), i("el-input", {
                        staticStyle: {
                            width: "400px"
                        },
                        attrs: {
                            size: "mini"
                        },
                        model: {
                            value: t.diy_setting.nameSmallWords,
                            callback: function(e) {
                                t.$set(t.diy_setting, "nameSmallWords", e)
                            },
                            expression: "diy_setting.nameSmallWords"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "武将名字体"
                        }
                    }, [i("span", {
                        attrs: {
                            slot: "label"
                        },
                        slot: "label"
                    }, [i("el-tooltip", {
                        attrs: {
                            content: "选择本地字体文件绘制武将名，会话期有效",
                            placement: "top-start"
                        }
                    }, [i("label", {
                        staticStyle: {
                            "font-size": "14px"
                        }
                    }, [t._v("武将名字体 "), i("i", {
                        staticClass: "el-icon-question"
                    })])])], 1), t._v(" "), i("el-button", {
                        staticStyle: {
                            "margin-right": "10px"
                        },
                        attrs: {
                            type: "primary",
                            size: "mini"
                        },
                        on: {
                            click: t.selectFontName
                        }
                    }, [t._v("选择字体")]), t._v(" "), i("input", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !1,
                            expression: "false"
                        }],
                        ref: "font_name_file",
                        attrs: {
                            type: "file",
                            accept: ".ttf,.otf,.woff,.woff2"
                        },
                        on: {
                            change: function(e) {
                                return t.selectFontNameFile()
                            }
                        }
                    }), t._v(" "), t.diy_setting.customFontName ? i("span", {
                        staticStyle: {
                            color: "#67C23A"
                        }
                    }, [t._v(t._s(t.diy_setting.customFontName))]) : t._e(), t._v(" "), t.diy_setting.customFontName ? i("el-button", {
                        staticStyle: {
                            color: "#F56C6C",
                            "margin-left": "10px"
                        },
                        attrs: {
                            type: "text",
                            size: "mini"
                        },
                        on: {
                            click: t.clearFontName
                        }
                    }, [t._v("清除")]) : t._e()], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "武将称号字体"
                        }
                    }, [i("span", {
                        attrs: {
                            slot: "label"
                        },
                        slot: "label"
                    }, [i("el-tooltip", {
                        attrs: {
                            content: "选择本地字体文件绘制武将称号，会话期有效",
                            placement: "top-start"
                        }
                    }, [i("label", {
                        staticStyle: {
                            "font-size": "14px"
                        }
                    }, [t._v("武将称号字体 "), i("i", {
                        staticClass: "el-icon-question"
                    })])])], 1), t._v(" "), i("el-button", {
                        staticStyle: {
                            "margin-right": "10px"
                        },
                        attrs: {
                            type: "primary",
                            size: "mini"
                        },
                        on: {
                            click: t.selectFontTitle
                        }
                    }, [t._v("选择字体")]), t._v(" "), i("input", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !1,
                            expression: "false"
                        }],
                        ref: "font_title_file",
                        attrs: {
                            type: "file",
                            accept: ".ttf,.otf,.woff,.woff2"
                        },
                        on: {
                            change: function(e) {
                                return t.selectFontTitleFile()
                            }
                        }
                    }), t._v(" "), t.diy_setting.customFontTitle ? i("span", {
                        staticStyle: {
                            color: "#67C23A"
                        }
                    }, [t._v(t._s(t.diy_setting.customFontTitle))]) : t._e(), t._v(" "), t.diy_setting.customFontTitle ? i("el-button", {
                        staticStyle: {
                            color: "#F56C6C",
                            "margin-left": "10px"
                        },
                        attrs: {
                            type: "text",
                            size: "mini"
                        },
                        on: {
                            click: t.clearFontTitle
                        }
                    }, [t._v("清除")]) : t._e()], 1), t._v(" "), i("div", {
                        staticStyle: {
                            width: "99%",
                            height: "1px",
                            "background-color": "#DDEEFF",
                            "margin-top": "6px",
                            "margin-bottom": "6px"
                        }
                    }), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "技能加粗的词"
                        }
                    }, [t._l(t.diy_setting.skill.skillBoldWords, function(e) {
                        return i("el-tag", {
                            key: e,
                            attrs: {
                                closable: "",
                                "disable-transitions": !1
                            },
                            on: {
                                close: function(i) {
                                    return t.removeWord(e)
                                }
                            }
                        }, [t._v("\n        " + t._s(e) + "\n      ")])
                    }), t._v(" "), t.newTagVisible ? i("el-input", {
                        ref: "saveTagInput",
                        staticClass: "input-new-tag",
                        attrs: {
                            size: "small"
                        },
                        on: {
                            blur: t.newTagConfirm
                        },
                        nativeOn: {
                            keyup: function(e) {
                                return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : t.newTagConfirm.apply(null, arguments)
                            }
                        },
                        model: {
                            value: t.newTag,
                            callback: function(e) {
                                t.newTag = e
                            },
                            expression: "newTag"
                        }
                    }) : i("el-button", {
                        staticClass: "button-new-tag",
                        attrs: {
                            size: "mini"
                        },
                        on: {
                            click: t.showInput
                        }
                    }, [t._v("+ 添加")])], 2), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "默认名字底部"
                        }
                    }, [i("span", {
                        attrs: {
                            slot: "label"
                        },
                        slot: "label"
                    }, [i("el-tooltip", {
                        attrs: {
                            content: "武将名文字上下微调使用",
                            placement: "top-start"
                        }
                    }, [i("label", {
                        staticStyle: {
                            "font-size": "14px"
                        }
                    }, [t._v("默认名字底部 "), i("i", {
                        staticClass: "el-icon-question"
                    })])])], 1), t._v(" "), i("el-input", {
                        staticStyle: {
                            width: "100px"
                        },
                        attrs: {
                            type: "number",
                            size: "mini"
                        },
                        on: {
                            change: t.reDraw
                        },
                        model: {
                            value: t.$store.state.app.diy_setting.skill.defaultNameBottomY,
                            callback: function(e) {
                                t.$set(t.$store.state.app.diy_setting.skill, "defaultNameBottomY", e)
                            },
                            expression: "$store.state.app.diy_setting.skill.defaultNameBottomY"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "技能框左侧"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "100px"
                        },
                        attrs: {
                            type: "number",
                            size: "mini"
                        },
                        on: {
                            change: t.reDraw
                        },
                        model: {
                            value: t.$store.state.app.diy_setting.skill.skillLeft,
                            callback: function(e) {
                                t.$set(t.$store.state.app.diy_setting.skill, "skillLeft", e)
                            },
                            expression: "$store.state.app.diy_setting.skill.skillLeft"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "技能区最顶部Top"
                        }
                    }, [i("span", {
                        attrs: {
                            slot: "label"
                        },
                        slot: "label"
                    }, [i("el-tooltip", {
                        attrs: {
                            content: "数字变小，技能框上移",
                            placement: "top-start"
                        }
                    }, [i("label", {
                        staticStyle: {
                            "font-size": "14px"
                        }
                    }, [t._v("技能区最顶部Top "), i("i", {
                        staticClass: "el-icon-question"
                    })])])], 1), t._v(" "), i("el-input", {
                        staticStyle: {
                            width: "100px"
                        },
                        attrs: {
                            type: "number",
                            size: "mini"
                        },
                        on: {
                            change: t.reDraw
                        },
                        model: {
                            value: t.$store.state.app.diy_setting.skill.skillTopMinY,
                            callback: function(e) {
                                t.$set(t.$store.state.app.diy_setting.skill, "skillTopMinY", e)
                            },
                            expression: "$store.state.app.diy_setting.skill.skillTopMinY"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "技能区底部Top"
                        }
                    }, [i("span", {
                        attrs: {
                            slot: "label"
                        },
                        slot: "label"
                    }, [i("el-tooltip", {
                        attrs: {
                            content: "数字变大，技能框下移。如不绘制版权画师等信息，可以适当增加10-20",
                            placement: "top-start"
                        }
                    }, [i("label", {
                        staticStyle: {
                            "font-size": "14px"
                        }
                    }, [t._v("技能区底部Top "), i("i", {
                        staticClass: "el-icon-question"
                    })])])], 1), t._v(" "), i("el-input", {
                        staticStyle: {
                            width: "100px"
                        },
                        attrs: {
                            type: "number",
                            size: "mini"
                        },
                        on: {
                            change: t.reDraw
                        },
                        model: {
                            value: t.$store.state.app.diy_setting.skill.skillBottomY,
                            callback: function(e) {
                                t.$set(t.$store.state.app.diy_setting.skill, "skillBottomY", e)
                            },
                            expression: "$store.state.app.diy_setting.skill.skillBottomY"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "技能区宽度"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "100px"
                        },
                        attrs: {
                            type: "number",
                            size: "mini"
                        },
                        on: {
                            change: t.reDraw
                        },
                        model: {
                            value: t.$store.state.app.diy_setting.skill.skillWidth,
                            callback: function(e) {
                                t.$set(t.$store.state.app.diy_setting.skill, "skillWidth", e)
                            },
                            expression: "$store.state.app.diy_setting.skill.skillWidth"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "技能描述字号"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "100px"
                        },
                        attrs: {
                            type: "number",
                            min: "10",
                            max: "16",
                            size: "mini"
                        },
                        on: {
                            change: t.reDraw
                        },
                        model: {
                            value: t.$store.state.app.diy_setting.skill.fontSize,
                            callback: function(e) {
                                t.$set(t.$store.state.app.diy_setting.skill, "fontSize", e)
                            },
                            expression: "$store.state.app.diy_setting.skill.fontSize"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "段间距"
                        }
                    }, [i("span", {
                        attrs: {
                            slot: "label"
                        },
                        slot: "label"
                    }, [i("el-tooltip", {
                        attrs: {
                            content: "2段技能描述之间的间距，填写和字号的比率",
                            placement: "top-start"
                        }
                    }, [i("label", {
                        staticStyle: {
                            "font-size": "14px"
                        }
                    }, [t._v("段间距 "), i("i", {
                        staticClass: "el-icon-question"
                    })])])], 1), t._v(" "), i("el-input", {
                        staticStyle: {
                            width: "100px"
                        },
                        attrs: {
                            size: "mini"
                        },
                        on: {
                            change: t.reDraw
                        },
                        model: {
                            value: t.$store.state.app.diy_setting.skill.paragraphSpacing,
                            callback: function(e) {
                                t.$set(t.$store.state.app.diy_setting.skill, "paragraphSpacing", e)
                            },
                            expression: "$store.state.app.diy_setting.skill.paragraphSpacing"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "行间距"
                        }
                    }, [i("span", {
                        attrs: {
                            slot: "label"
                        },
                        slot: "label"
                    }, [i("el-tooltip", {
                        attrs: {
                            content: "行间距，填写和字号的比率",
                            placement: "top-start"
                        }
                    }, [i("label", {
                        staticStyle: {
                            "font-size": "14px"
                        }
                    }, [t._v("行间距 "), i("i", {
                        staticClass: "el-icon-question"
                    })])])], 1), t._v(" "), i("el-input", {
                        staticStyle: {
                            width: "100px"
                        },
                        attrs: {
                            size: "mini"
                        },
                        on: {
                            change: t.reDraw
                        },
                        model: {
                            value: t.$store.state.app.diy_setting.skill.lineSpacing,
                            callback: function(e) {
                                t.$set(t.$store.state.app.diy_setting.skill, "lineSpacing", e)
                            },
                            expression: "$store.state.app.diy_setting.skill.lineSpacing"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "底部编号"
                        }
                    }, [i("span", {
                        attrs: {
                            slot: "label"
                        },
                        slot: "label"
                    }, [i("el-tooltip", {
                        attrs: {
                            content: "是否开启底部编号",
                            placement: "top-start"
                        }
                    }, [i("label", {
                        staticStyle: {
                            "font-size": "14px"
                        }
                    }, [t._v("底部编号 "), i("i", {
                        staticClass: "el-icon-question"
                    })])])], 1), t._v(" "), i("el-radio-group", {
                        on: {
                            change: t.reDraw
                        },
                        model: {
                            value: t.$store.state.app.diy_setting.hasBottomInfo,
                            callback: function(e) {
                                t.$set(t.$store.state.app.diy_setting, "hasBottomInfo", e)
                            },
                            expression: "$store.state.app.diy_setting.hasBottomInfo"
                        }
                    }, [i("el-radio", {
                        attrs: {
                            label: !0
                        }
                    }, [t._v("开启")]), t._v(" "), i("el-radio", {
                        attrs: {
                            label: !1
                        }
                    }, [t._v("关闭")])], 1)], 1)], 1), t._v(" "), i("div", {
                        staticClass: "dialog-footer",
                        attrs: {
                            slot: "footer"
                        },
                        slot: "footer"
                    }, [i("el-button", {
                        on: {
                            click: t.resetSetting
                        }
                    }, [t._v("重置")]), t._v(" "), i("el-button", {
                        nativeOn: {
                            click: function(e) {
                                t.settingFormVisible = !1
                            }
                        }
                    }, [t._v("取消")]), t._v(" "), i("el-button", {
                        attrs: {
                            type: "primary"
                        },
                        on: {
                            click: t.doSave
                        }
                    }, [t._v("保存")])], 1)], 1)
                },
                staticRenderFns: []
            };
        var u = i("VU/8")(d, m, !1, function(t) {
            i("SmEV")
        }, null, null);
        e.a = u.exports
    }
});