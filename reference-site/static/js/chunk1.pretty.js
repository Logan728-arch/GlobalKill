webpackJsonp([1], {
    "2NXm": function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = i("BO1k"),
            n = i.n(s),
            o = i("Dd8w"),
            a = i.n(o),
            l = i("X2Oc"),
            r = i("NYxO"),
            c = i("d2gY"),
            d = (i("vnWh"), i("guQW"), i("N/aW")),
            g = i("zm5D"),
            p = i("kwUQ"),
            u = {
                components: {
                    DialogSetting: g.a,
                    TopBar: p.a
                },
                data: function() {
                    return {
                        type: this.$route.query.type,
                        user_id: parseInt(sessionStorage.getItem("user_id")),
                        user_info: JSON.parse(sessionStorage.getItem("user_info")),
                        left_bg_code: this.$store.state.app.country_code,
                        country_code: this.$store.state.app.country_code,
                        country: this.$store.state.app.country,
                        logicRate: this.$store.state.app.logicRate,
                        isKing: !1,
                        hiddenText: "",
                        cardLogicalHeight: this.$store.state.app.cardSizeOptions[this.$store.state.app.diy_setting.cardSize].height,
                        cardLogicalWidth: this.$store.state.app.cardSizeOptions[this.$store.state.app.diy_setting.cardSize].width,
                        canvas: null,
                        ctx: null,
                        scale: null == localStorage.getItem("scale") ? 100 : parseInt(localStorage.getItem("scale")),
                        file: null,
                        imgUrl: "",
                        imgBg: new Image,
                        imgLogo: new Image,
                        card: null,
                        logicalWidth: 0,
                        logicalHeight: 0,
                        input_blood_max_state: !1,
                        dragPars: {
                            offsetX: 0,
                            offsetY: 0,
                            lock: !0
                        },
                        leftBg: [],
                        importDialogState: !1,
                        importDataType: null == localStorage.getItem("import_data_type") ? "1" : localStorage.getItem("import_data_type"),
                        importData: "",
                        select_country: "",
                        select_name: "",
                        preview_img_src: "",
                        preview_img_width: 0,
                        preview_img_height: 0,
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
                        }]
                    }
                },
                computed: a()({}, Object(r.c)({
                    diy_setting: function(t) {
                        return t.app.diy_setting
                    },
                    legend: function(t) {
                        return t.app.legend
                    },
                    legends: function(t) {
                        return t.app.legends
                    }
                }), Object(r.b)({
                    filterLegends: "app/filterLegends"
                })),
                created: function() {},
                mounted: function() {
                    var t = this;
                    sessionStorage.getItem("user_id") > 0 && this.$store.dispatch("loadAllLegends").then(function() {
                        console.log("我的武将加载完成!")
                    }), this.input_blood_max_state = this.legend.blood != this.legend.blood_max, Object(l.j)("/static/2022/bg2.png").then(function(e) {
                        t.imgBg = e
                    }), Object(l.j)("/static/huan12.png").then(function(e) {
                        t.imgLogo = e
                    }), Object(l.j)("/static/logo_biao.png").then(function(e) {
                        t.imgLogo = e
                    }), this.canvas = document.getElementById("card_preview"), this.ctx = this.canvas.getContext("2d"), this.cardLogicalHeight = this.$store.state.app.cardSizeOptions[this.diy_setting.cardSize].height, this.cardLogicalWidth = this.$store.state.app.cardSizeOptions[this.diy_setting.cardSize].width;
                    var e = Object(l.l)(this.canvas, this.ctx, this.cardLogicalHeight, this.cardLogicalWidth);
                    this.logicalWidth = e[0], this.logicalHeight = e[1];
                    var i = function(e) {
                            Object(l.j)("/static/2022/" + e + ".png").then(function(i) {
                                t.leftBg[e] = i
                            })
                        },
                        s = !0,
                        o = !1,
                        a = void 0;
                    try {
                        for (var r, c = n()(["wei", "shu", "wu", "qun", "wei_zhu", "shu_zhu", "wu_zhu", "qun_zhu", "shen", "jin", "jin_zhu"]); !(s = (r = c.next()).done); s = !0) {
                            i(r.value)
                        }
                    } catch (t) {
                        o = !0, a = t
                    } finally {
                        try {
                            !s && c.return && c.return()
                        } finally {
                            if (o) throw a
                        }
                    }
                    null == this.img && Object(l.j)("/static/guohuanghou.jpg").then(function(e) {
                        t.img = e, t.card = new d.a(e), t.draw(), setTimeout(t.draw(), 5e3)
                    }), Object(l.i)(sessionStorage.getItem("user_id")) && ("login" == this.type ? this.$refs.top_bar.openLogin() : "register" == this.type && this.refs.top_bar.openRegister()), document.fonts.ready.then(function() {
                        console.log("所有字体加载完成"), t.draw()
                    })
                },
                methods: {
                    resizeCanvas: function() {
                        this.cardLogicalHeight = this.$store.state.app.cardSizeOptions[this.diy_setting.cardSize].height, this.cardLogicalWidth = this.$store.state.app.cardSizeOptions[this.diy_setting.cardSize].width, console.log(this.cardLogicalHeight + " --- " + this.cardLogicalWidth);
                        var t = Object(l.l)(this.canvas, this.ctx, this.cardLogicalHeight, this.cardLogicalWidth);
                        this.logicalWidth = t[0], this.logicalHeight = t[1]
                    },
                    draw: function() {
                        var t = this;
                        null == this.card && (this.card = new d.a(this.img)), this.card.drawCard(this.ctx, this.logicalWidth, this.logicalHeight), this.isKing ? this.left_bg_code = this.country_code + "_zhu" : this.left_bg_code = this.country_code;
                        var e = this.logicalHeight,
                            i = this.leftBg[this.left_bg_code].height / (this.logicalHeight / this.logicalWidth * this.logicRate) - 40;
                        this.ctx.drawImage(this.leftBg[this.left_bg_code], 0, 0, this.leftBg[this.left_bg_code].width, this.leftBg[this.left_bg_code].height, 0, 0, i, e), Object(l.b)(this.ctx, this.imgBg, this.country_code, this.isKing, this.legend.blood, this.legend.blood_max);
                        var s = Object(l.f)(this.ctx, this.legend.skills, this.imgBg, this.country_code, this.isKing);
                        Object(l.g)(this.ctx, this.isKing, s, this.country_code, this.imgBg), Object(l.c)(this.ctx, this.canvas, this.imgBg, this.$store.state.app.diy_setting.hasBottomInfo, this.legend, this.country_code), Object(l.d)(this.ctx, this.canvas, this.hiddenText), "欢" == sessionStorage.getItem("logo") ? (Object(l.j)("/static/huan12.png").then(function(e) {
                            t.imgLogo = e
                        }), Object(l.e)(this.ctx, this.imgLogo)) : "标" == sessionStorage.getItem("logo") && (Object(l.j)("/static/logo_biao.png").then(function(e) {
                            t.imgLogo = e
                        }), Object(l.e)(this.ctx, this.imgLogo))
                    },
                    saveImportDataType: function() {
                        localStorage.setItem("import_data_type", this.importDataType)
                    },
                    openSettingDialog: function() {
                        this.$refs.dialog_setting.settingFormVisible = !0
                    },
                    selectFile: function() {
                        this.$refs.form_file.dispatchEvent(new MouseEvent("click"))
                    },
                    selectImg: function() {
                        var t = this,
                            e = this.$refs.form_file;
                        void 0 != e.files[0] && Object(l.j)(URL.createObjectURL(e.files[0])).then(function(e) {
                            t.card = new d.a(e), t.draw()
                        })
                    },
                    changeSkillType: function(t, e) {
                        t.is_add = e, this.draw()
                    },
                    changeCountry: function() {
                        this.country = c.a.get(this.country_code), this.isKing ? this.left_bg_code = this.country_code + "_zhu" : this.left_bg_code = this.country_code, this.$store.dispatch("changeCountry", {
                            country_code: this.country_code,
                            country: this.country
                        }), this.draw()
                    },
                    showMaxBlood: function() {
                        this.input_blood_max_state = !this.input_blood_max_state
                    },
                    changeBlood: function() {
                        this.legend.blood > this.legend.blood_max && (this.legend.blood_max = this.legend.blood), this.draw()
                    },
                    changeCopyright: function() {
                        Object(l.i)(this.legend.copyright) || localStorage.setItem("copyright", this.legend.copyright), this.draw()
                    },
                    changeID: function() {
                        Object(l.i)(this.legend.id) || localStorage.setItem("id", this.legend.id), this.draw()
                    },
                    addSkill: function() {
                        var t = 0;
                        this.legend.skills.length > 0 && (t = this.legend.skills.length + 1), this.legend.skills.push({
                            idx: t,
                            skill_name: "",
                            skill_desc: "",
                            is_add: "0"
                        }), this.draw()
                    },
                    removeSkill: function(t) {
                        if (this.legend.skills.splice(this.legend.skills.findIndex(function(e) {
                                return e.idx == t
                            }), 1), this.legend.skills.length > 0)
                            for (var e = 0; e < this.legend.skills.length; e++) this.legend.skills[e].idx = e;
                        this.draw()
                    },
                    canvasMouseDown: function(t) {
                        t.preventDefault(), this.dragPars.lock = !1, this.dragPars.offsetX = t.clientX - this.card.x, this.dragPars.offsetY = t.clientY - this.card.y
                    },
                    canvasMouseUp: function() {
                        this.dragPars.lock = !0
                    },
                    canvasMouseMove: function(t) {
                        null != this.card && 0 == this.dragPars.lock && (this.card.x = t.clientX - this.dragPars.offsetX, this.card.y = t.clientY - this.dragPars.offsetY, this.draw())
                    },
                    changeScale: function(t) {
                        this.scale = t, this.card.scale = t / 100, localStorage.setItem("scale", t), this.draw()
                    },
                    changeKing: function() {
                        this.draw()
                    },
                    showImportCon: function() {
                        document.getElementById("importCon").style.height = window.innerHeight + "px", this.importDialogState = !0
                    },
                    hideImportCon: function() {
                        this.importDialogState = !1
                    },
                    doImport: function() {
                        Object(l.i)(this.importData) ? this.hideImportCon() : (this.legends.length = 0, this.$store.dispatch("loadLegends", {
                            str: this.importData,
                            type: this.importDataType
                        }), this.$message({
                            message: this.legends.length + "个武将信息，导入完毕！可以下拉选择武将！",
                            type: "success",
                            duration: 1500
                        }), this.importDialogState = !1)
                    },
                    selectCountry: function() {
                        console.log(this.select_country), this.$store.getters.filterLegends(this.select_country)
                    },
                    selectName: function() {
                        var t = this,
                            e = this.$store.getters.filterLegends(this.select_country).find(function(e) {
                                return e.name == t.select_name
                            });
                        this.country_code = e.country_code, this.country = e.country, this.$store.state.app.setting.defaultKing.includes(this.select_name) ? this.isKing = !0 : this.isKing = !1, this.isKing ? this.left_bg_code = this.country_code + "_zhu" : this.left_bg_code = this.country_code, Object(l.i)(e.copyright) && (this.legend.copyright = localStorage.getItem("copyright")), this.$store.dispatch("selectLegend", e), this.draw()
                    },
                    previewImg: function() {
                        this.preview_img_src = this.canvas.toDataURL("image/jpeg", 1), this.preview_img_width = this.$store.state.app.cardSizeOptions[this.diy_setting.cardSize].pc_width, this.preview_img_height = this.$store.state.app.cardSizeOptions[this.diy_setting.cardSize].pc_height
                    },
                    downloadImg: function() {
                        var t = document.getElementById("a_download");
                        t.download = this.legend.name, t.href = this.canvas.toDataURL("image/jpeg", 1);
                        var e = new MouseEvent("click");
                        t.dispatchEvent(e)
                    },
                    moveTop: function() {
                        1 == this.card.scale ? this.card.y = 0 : this.card.scale > 1 ? this.card.y = Math.ceil((this.logicalHeight * this.card.scale - this.logicalHeight) / 2) : this.card.scale < 1 && (this.card.y = -Math.ceil((this.logicalHeight - this.logicalHeight * this.card.scale) / 2)), this.draw()
                    },
                    moveMaxRight: function() {
                        1 == this.card.scale ? this.card.x = -(this.card.width / this.card.height * this.logicalHeight - this.logicalWidth) / 2 : this.card.x = -(this.card.width / this.card.height * this.logicalHeight * this.card.scale - this.logicalWidth) / 2, this.draw()
                    },
                    moveUp: function() {
                        this.card.y = this.card.y - 1, this.draw()
                    },
                    moveDown: function() {
                        this.card.y = this.card.y + 1, this.draw()
                    },
                    moveLeft: function() {
                        this.card.x = this.card.x - 1, this.draw()
                    },
                    moveRight: function() {
                        this.card.x = this.card.x + 1, this.draw()
                    },
                    toMyLegend: function() {
                        this.$router.push({
                            path: "/legends"
                        }).catch(function(t) {
                            console.log(t)
                        })
                    },
                    bottomCbxClick: function() {
                        this.$store.state.app.diy_setting.hasBottomInfo = !this.$store.state.app.diy_setting.hasBottomInfo, this.$store.state.app.setting.hasBottomInfo = !this.$store.state.app.setting.hasBottomInfo
                    }
                }
            },
            m = {
                render: function() {
                    var t = this,
                        e = t.$createElement,
                        i = t._self._c || e;
                    return i("div", [i("top-bar", {
                        ref: "top_bar",
                        attrs: {
                            menuIndex: "1"
                        }
                    }), t._v(" "), i("div", {
                        staticStyle: {
                            display: "flex",
                            "justify-content": "center"
                        }
                    }, [i("div", {
                        staticClass: "content_outer"
                    }, [i("div", {
                        staticClass: "card_outer"
                    }, [i("div", {
                        staticClass: "canvas_outer"
                    }, [i("canvas", {
                        staticStyle: {
                            cursor: "pointer",
                            "border-radius": "12px",
                            border: "1px solid #000"
                        },
                        attrs: {
                            id: "card_preview"
                        },
                        on: {
                            mousedown: function(e) {
                                return t.canvasMouseDown(e)
                            },
                            mouseup: function(e) {
                                return t.canvasMouseUp(e)
                            },
                            mousemove: function(e) {
                                return t.canvasMouseMove(e)
                            }
                        }
                    })]), t._v(" "), i("div", {
                        staticStyle: {
                            "padding-left": "60px",
                            "margin-bottom": "20px"
                        }
                    }, [i("div", [i("el-checkbox", {
                        on: {
                            change: function(e) {
                                return t.draw()
                            }
                        },
                        model: {
                            value: t.$store.state.app.diy_setting.hasBottomInfo,
                            callback: function(e) {
                                t.$set(t.$store.state.app.diy_setting, "hasBottomInfo", e)
                            },
                            expression: "$store.state.app.diy_setting.hasBottomInfo"
                        }
                    }, [t._v("底部信息（左：版权画师、右：编号）")])], 1), t._v(" "), i("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.$store.state.app.diy_setting.hasBottomInfo,
                            expression: "$store.state.app.diy_setting.hasBottomInfo"
                        }],
                        staticClass: "bottom_edit_outer"
                    }, [i("div", {
                        staticClass: "left_outer"
                    }, [i("div", [i("el-input", {
                        staticStyle: {
                            width: "240px"
                        },
                        attrs: {
                            placeholder: "™&@ 2021 三国杀 illustration: KayaK",
                            size: "mini",
                            maxlength: "50"
                        },
                        on: {
                            change: function(e) {
                                return t.changeCopyright()
                            }
                        },
                        model: {
                            value: t.legend.copyright,
                            callback: function(e) {
                                t.$set(t.legend, "copyright", e)
                            },
                            expression: "legend.copyright"
                        }
                    })], 1)]), t._v(" "), i("div", {
                        staticClass: "right_outer"
                    }, [i("div", [i("el-input", {
                        staticStyle: {
                            width: "100px"
                        },
                        attrs: {
                            placeholder: "WEI 001",
                            size: "mini",
                            maxlength: "10"
                        },
                        on: {
                            change: function(e) {
                                return t.changeID()
                            }
                        },
                        model: {
                            value: t.legend.id,
                            callback: function(e) {
                                t.$set(t.legend, "id", e)
                            },
                            expression: "legend.id"
                        }
                    })], 1)])])]), t._v(" "), i("div", {
                        staticClass: "preview_btn_outer"
                    }, [i("el-button", {
                        attrs: {
                            type: "primary",
                            size: "small",
                            plain: ""
                        },
                        on: {
                            click: t.previewImg
                        }
                    }, [t._v("预览")]), t._v(" "), i("el-button", {
                        attrs: {
                            type: "primary",
                            size: "small",
                            plain: ""
                        },
                        on: {
                            click: t.downloadImg
                        }
                    }, [t._v("下载")]), t._v(" "), i("el-button", {
                        attrs: {
                            type: "primary",
                            size: "small",
                            plain: ""
                        },
                        on: {
                            click: t.openSettingDialog
                        }
                    }, [t._v("设置")])], 1)]), t._v(" "), i("div", {
                        staticClass: "card_panel"
                    }, [i("el-form", {
                        ref: "form",
                        attrs: {
                            "label-width": "80px"
                        }
                    }, [i("div", {
                        staticStyle: {
                            position: "relative"
                        }
                    }, [i("el-form-item", {
                        staticStyle: {
                            "margin-top": "6px",
                            "margin-bottom": "6px"
                        },
                        attrs: {
                            label: "武将图"
                        }
                    }, [i("el-button", {
                        attrs: {
                            type: "primary",
                            size: "small",
                            plain: ""
                        },
                        on: {
                            click: t.selectFile
                        }
                    }, [t._v("选择图片")]), t._v(" "), i("input", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !1,
                            expression: "false"
                        }],
                        ref: "form_file",
                        attrs: {
                            type: "file",
                            accept: "image/jpeg, image/jpg, image/png"
                        },
                        on: {
                            change: function(e) {
                                return t.selectImg()
                            }
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        staticStyle: {
                            "margin-bottom": "6px"
                        },
                        attrs: {
                            label: "缩放"
                        }
                    }, [i("el-input-number", {
                        attrs: {
                            min: 50,
                            max: 150,
                            size: "mini",
                            label: "图片缩放"
                        },
                        on: {
                            change: t.changeScale
                        },
                        model: {
                            value: t.scale,
                            callback: function(e) {
                                t.scale = e
                            },
                            expression: "scale"
                        }
                    }), t._v(" "), i("i", {
                        staticClass: "el-icon-refresh",
                        on: {
                            click: function(e) {
                                return t.changeScale(100)
                            }
                        }
                    })], 1), t._v(" "), i("div", {
                        staticStyle: {
                            position: "absolute",
                            right: "0px",
                            top: "-6px",
                            width: "200px",
                            height: "90px",
                            "border-left": "1px solid #DDEEFF"
                        }
                    }, [i("div", {
                        staticStyle: {
                            position: "relative",
                            "margin-left": "20px",
                            "margin-top": "6px"
                        }
                    }, [i("el-button", {
                        staticStyle: {
                            position: "absolute",
                            left: "40px",
                            top: "0px",
                            padding: "3px 8px"
                        },
                        attrs: {
                            id: "btn_move_up",
                            type: "primary",
                            icon: "el-icon-arrow-up",
                            plain: "",
                            size: "mini"
                        },
                        on: {
                            click: t.moveUp
                        }
                    }), t._v(" "), i("el-button", {
                        staticStyle: {
                            position: "absolute",
                            left: "66px",
                            top: "0px",
                            padding: "3px 8px"
                        },
                        attrs: {
                            id: "btn_move_up_max",
                            type: "primary",
                            icon: "el-icon-top",
                            plain: "",
                            size: "mini"
                        },
                        on: {
                            click: t.moveTop
                        }
                    }), t._v(" "), i("el-button", {
                        staticStyle: {
                            position: "absolute",
                            left: "0px",
                            top: "30px",
                            padding: "3px 8px"
                        },
                        attrs: {
                            id: "btn_move_left",
                            type: "primary",
                            icon: "el-icon-arrow-left",
                            plain: "",
                            size: "mini"
                        },
                        on: {
                            click: t.moveLeft
                        }
                    }), t._v(" "), i("el-button", {
                        staticStyle: {
                            position: "absolute",
                            left: "60px",
                            top: "30px",
                            padding: "3px 8px"
                        },
                        attrs: {
                            id: "btn_move_right",
                            type: "primary",
                            icon: "el-icon-arrow-right",
                            plain: "",
                            size: "mini"
                        },
                        on: {
                            click: t.moveRight
                        }
                    }), t._v(" "), i("el-button", {
                        staticStyle: {
                            position: "absolute",
                            left: "96px",
                            top: "30px",
                            padding: "3px 8px"
                        },
                        attrs: {
                            id: "btn_move_right_max",
                            type: "primary",
                            icon: "el-icon-right",
                            plain: "",
                            size: "mini"
                        },
                        on: {
                            click: t.moveMaxRight
                        }
                    }), t._v(" "), i("el-button", {
                        staticStyle: {
                            position: "absolute",
                            left: "30px",
                            top: "60px",
                            padding: "3px 8px"
                        },
                        attrs: {
                            id: "btn_move_down",
                            type: "primary",
                            icon: "el-icon-arrow-down",
                            plain: "",
                            size: "mini"
                        },
                        on: {
                            click: t.moveDown
                        }
                    })], 1)])], 1), t._v(" "), i("div", {
                        staticStyle: {
                            width: "99%",
                            height: "1px",
                            "background-color": "#DDEEFF",
                            "margin-bottom": "6px"
                        }
                    }), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "势力"
                        }
                    }, [i("el-radio-group", {
                        on: {
                            change: t.changeCountry
                        },
                        model: {
                            value: t.country_code,
                            callback: function(e) {
                                t.country_code = e
                            },
                            expression: "country_code"
                        }
                    }, [i("el-radio", {
                        staticClass: "country_wei",
                        attrs: {
                            label: "wei"
                        }
                    }, [t._v("魏")]), t._v(" "), i("el-radio", {
                        staticClass: "country_shu",
                        attrs: {
                            label: "shu"
                        }
                    }, [t._v("蜀")]), t._v(" "), i("el-radio", {
                        staticClass: "country_wu",
                        attrs: {
                            label: "wu"
                        }
                    }, [t._v("吴")]), t._v(" "), i("el-radio", {
                        staticClass: "country_qun",
                        attrs: {
                            label: "qun"
                        }
                    }, [t._v("群")]), t._v(" "), i("el-radio", {
                        staticClass: "country_jin",
                        attrs: {
                            label: "jin"
                        }
                    }, [t._v("晋")]), t._v(" "), i("el-radio", {
                        staticClass: "country_shen",
                        attrs: {
                            label: "shen"
                        }
                    }, [t._v("神")])], 1)], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "名字"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "80px"
                        },
                        attrs: {
                            placeholder: "武将名字",
                            size: "mini"
                        },
                        on: {
                            change: function(e) {
                                return t.draw()
                            }
                        },
                        model: {
                            value: t.legend.name,
                            callback: function(e) {
                                t.$set(t.legend, "name", e)
                            },
                            expression: "legend.name"
                        }
                    }), t._v(" "), t.user_id > 0 ? i("span", [i("el-select", {
                        staticStyle: {
                            width: "70px",
                            "margin-left": "30px"
                        },
                        attrs: {
                            size: "mini",
                            placeholder: "请选择"
                        },
                        on: {
                            change: t.selectCountry
                        },
                        model: {
                            value: t.select_country,
                            callback: function(e) {
                                t.select_country = e
                            },
                            expression: "select_country"
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
                        staticStyle: {
                            width: "110px"
                        },
                        attrs: {
                            size: "mini",
                            placeholder: "请选择"
                        },
                        on: {
                            change: t.selectName
                        },
                        model: {
                            value: t.select_name,
                            callback: function(e) {
                                t.select_name = e
                            },
                            expression: "select_name"
                        }
                    }, t._l(t.$store.getters.filterLegends(t.select_country), function(t) {
                        return i("el-option", {
                            key: t.name,
                            attrs: {
                                label: t.name,
                                value: t.name
                            }
                        })
                    }), 1), t._v(" "), "1" == t.user_info.level ? [i("el-button", {
                        attrs: {
                            type: "primary",
                            size: "mini"
                        },
                        on: {
                            click: t.toMyLegend
                        }
                    }, [t._v("管理武将")])] : [i("el-button", {
                        attrs: {
                            type: "primary",
                            size: "mini"
                        },
                        on: {
                            click: t.showImportCon
                        }
                    }, [t._v("导入")])]], 2) : t._e()], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "称号"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "140px"
                        },
                        attrs: {
                            placeholder: "武将称号",
                            size: "mini"
                        },
                        on: {
                            change: function(e) {
                                return t.draw()
                            }
                        },
                        model: {
                            value: t.legend.title,
                            callback: function(e) {
                                t.$set(t.legend, "title", e)
                            },
                            expression: "legend.title"
                        }
                    })], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "主公"
                        }
                    }, [i("el-checkbox-group", {
                        model: {
                            value: t.isKing,
                            callback: function(e) {
                                t.isKing = e
                            },
                            expression: "isKing"
                        }
                    }, [i("el-checkbox", {
                        staticClass: "king_outer",
                        attrs: {
                            label: "",
                            name: "king"
                        },
                        on: {
                            change: function(e) {
                                return t.changeKing()
                            }
                        }
                    })], 1)], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "体力值"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "100px"
                        },
                        attrs: {
                            type: "number",
                            placeholder: "体力值",
                            maxlength: "2",
                            min: "2",
                            max: "16",
                            size: "mini"
                        },
                        on: {
                            change: function(e) {
                                return t.changeBlood()
                            }
                        },
                        model: {
                            value: t.legend.blood,
                            callback: function(e) {
                                t.$set(t.legend, "blood", e)
                            },
                            expression: "legend.blood"
                        }
                    }), t._v(" "), i("i", {
                        staticClass: "el-icon-view",
                        staticStyle: {
                            display: "inline-block",
                            "font-size": "14px",
                            "margin-left": "6px",
                            "margin-right": "6px",
                            cursor: "pointer",
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
                    }, [i("div", {
                        staticClass: "el-form-item__label"
                    }, [t._v("最大体力值")]), t._v(" "), i("el-input", {
                        staticStyle: {
                            width: "120px"
                        },
                        attrs: {
                            type: "number",
                            placeholder: "最大体力值",
                            maxlength: "2",
                            min: "2",
                            max: "16",
                            size: "mini"
                        },
                        on: {
                            change: function(e) {
                                return t.changeBlood()
                            }
                        },
                        model: {
                            value: t.legend.blood_max,
                            callback: function(e) {
                                t.$set(t.legend, "blood_max", e)
                            },
                            expression: "legend.blood_max"
                        }
                    })], 1)], 1), t._v(" "), i("el-form-item", {
                        attrs: {
                            label: "隐藏信息"
                        }
                    }, [i("el-input", {
                        staticStyle: {
                            width: "120px"
                        },
                        attrs: {
                            placeholder: "隐藏信息",
                            size: "mini"
                        },
                        on: {
                            change: function(e) {
                                return t.draw()
                            }
                        },
                        model: {
                            value: t.hiddenText,
                            callback: function(e) {
                                t.hiddenText = e
                            },
                            expression: "hiddenText"
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
                    }, [i("span", [t._v("♠")]), t._v(" "), i("span", [t._v("♥")]), t._v(" "), i("span", [t._v("♣")]), t._v(" "), i("span", [t._v("♦")])]), t._v(" "), i("div", [t._l(t.legend.skills, function(e) {
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
                                change: function(e) {
                                    return t.draw()
                                },
                                input: function(i) {
                                    i.target.composing || t.$set(e, "skill_name", i.target.value)
                                }
                            }
                        }), t._v("\n                 \n                "), "1" == e.is_add ? i("i", {
                            staticClass: "el-icon-unlock",
                            on: {
                                click: function(i) {
                                    return t.changeSkillType(e, "0")
                                }
                            }
                        }) : i("i", {
                            staticClass: "el-icon-lock",
                            on: {
                                click: function(i) {
                                    return t.changeSkillType(e, "1")
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
                                change: function(e) {
                                    return t.draw()
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
                    })])], 2)], 1)], 1)])]), t._v(" "), i("div", {
                        attrs: {
                            id: "preview_outer"
                        }
                    }, [i("img", {
                        staticStyle: {
                            "border-radius": "30px"
                        },
                        attrs: {
                            src: t.preview_img_src,
                            width: t.preview_img_width,
                            height: t.preview_img_height,
                            title: "可直接鼠标右键另存为，就是武将图成品"
                        }
                    }), t._v(" "), i("a", {
                        attrs: {
                            id: "a_download"
                        }
                    })]), t._v(" "), t._m(0), t._v(" "), i("div", {
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
                            click: t.doImport
                        }
                    }, [t._v("导入")]), t._v(" "), i("el-button", {
                        attrs: {
                            type: "primary",
                            size: "mini"
                        },
                        on: {
                            click: t.hideImportCon
                        }
                    }, [t._v("关闭")])], 1)]), t._v(" "), i("dialog-setting", {
                        directives: [{
                            name: "dialogDrag",
                            rawName: "v-dialogDrag"
                        }],
                        ref: "dialog_setting"
                    })], 1)
                },
                staticRenderFns: [function() {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("div", {
                        staticStyle: {
                            display: "flex",
                            "justify-content": "center"
                        }
                    }, [e("a", {
                        staticStyle: {
                            color: "#000"
                        },
                        attrs: {
                            href: "https://beian.miit.gov.cn/",
                            target: "_blank"
                        }
                    }, [this._v("蜀ICP备18001603号")])])
                }]
            };
        var h = i("VU/8")(u, m, !1, function(t) {
            i("ZeCH"), i("usbi"), i("j1A8"), i("bRGz")
        }, "data-v-00bb1917", null);
        e.default = h.exports
    },
    "9bBU": function(t, e, i) {
        i("mClu");
        var s = i("FeBl").Object;
        t.exports = function(t, e, i) {
            return s.defineProperty(t, e, i)
        }
    },
    C4MV: function(t, e, i) {
        t.exports = {
            default: i("9bBU"),
            __esModule: !0
        }
    },
    MpbV: function(t, e) {},
    "N/aW": function(t, e, i) {
        "use strict";
        var s = i("Zrlr"),
            n = i.n(s),
            o = i("wxAW"),
            a = i.n(o),
            l = function() {
                function t(e) {
                    n()(this, t), this.img = e, this.width = e.width, this.height = e.height, this.scale = 1, this.x = 0, this.y = 0
                }
                return a()(t, [{
                    key: "changeScale",
                    value: function(t) {
                        (t *= 1) < .01 && (t = .01), t = Math.floor(1e4 * t) / 1e4, this.scale = t
                    }
                }, {
                    key: "drawCard",
                    value: function(t, e, i) {
                        var s = 1 * e / i,
                            n = 1 * this.width / this.height,
                            o = 0,
                            a = 0;
                        s < n ? o = (a = 1 * i * this.scale) * n : a = (o = 1 * e * this.scale) / n;
                        var l = 1 * i / 2,
                            r = 1 * e / 2 + this.x - o / 2,
                            c = l + this.y - a / 2;
                        t.clearRect(0, 0, e, i), t.drawImage(this.img, r, c, o, a)
                    }
                }]), t
            }();
        e.a = l
    },
    SmEV: function(t, e) {},
    ZeCH: function(t, e) {},
    bRGz: function(t, e) {},
    fkU4: function(t, e) {},
    j1A8: function(t, e) {},
    jgBo: function(t, e) {},
    kwUQ: function(t, e, i) {
        "use strict";
        var s = i("woOf"),
            n = i.n(s),
            o = {
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
                                validator: function(e, i, s) {
                                    i ? t.test(i) ? s() : s(new Error("请输入正确的11位手机号码")) : s(new Error("请输入电话号码"))
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
                        var e = n()({}, this.formLogin);
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
            a = {
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
        var l = {
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
                                validator: function(t, i, s) {
                                    i ? e.test(i) ? s() : s(new Error("请输入正确的11位手机号码")) : s(new Error("请输入电话号码"))
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
                                validator: function(e, i, s) {
                                    "" === i ? s(new Error("请再次输入密码")) : i !== t.modelRegisterForm.user_pwd ? s(new Error("两次输入密码不一致!")) : s()
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
                        var e = n()({}, this.modelRegisterForm);
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
                    DialogLogin: i("VU/8")(o, a, !1, function(t) {
                        i("MpbV")
                    }, "data-v-55c2f6c0", null).exports,
                    DialogRegister: i("VU/8")(l, r, !1, function(t) {
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
        var g = i("VU/8")(c, d, !1, function(t) {
            i("jgBo")
        }, "data-v-056c6729", null);
        e.a = g.exports
    },
    mClu: function(t, e, i) {
        var s = i("kM2E");
        s(s.S + s.F * !i("+E39"), "Object", {
            defineProperty: i("evD5").f
        })
    },
    usbi: function(t, e) {},
    wxAW: function(t, e, i) {
        "use strict";
        e.__esModule = !0;
        var s, n = i("C4MV"),
            o = (s = n) && s.__esModule ? s : {
                default: s
            };
        e.default = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var s = e[i];
                    s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), (0, o.default)(t, s.key, s)
                }
            }
            return function(e, i, s) {
                return i && t(e.prototype, i), s && t(e, s), e
            }
        }()
    },
    zm5D: function(t, e, i) {
        "use strict";
        var s = i("woOf"),
            n = i.n(s),
            o = i("fZjL"),
            a = i.n(o),
            l = i("Dd8w"),
            r = i.n(l),
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
                        return a()(this.cardSizeOptions).forEach(function(i) {
                            e.push(n()({
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
                        this.diy_setting.nameSmallWords = this.$store.state.app.setting.nameSmallWords, this.diy_setting.skill = n()({}, this.$store.state.app.setting.skill), this.clearFontName(), this.clearFontTitle(), this.$parent.draw()
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
                            s = "custom_" + e + "_" + Date.now(),
                            n = new FileReader;
                        n.onload = function(t) {
                            var n = t.target.result,
                                o = document.createElement("style");
                            o.id = "font_" + e, o.innerHTML = "@font-face { font-family: '" + s + "'; src: url(" + n + "); }";
                            var a = document.getElementById("font_" + e);
                            a && a.remove(), document.head.appendChild(o), i.$store.state.app.diy_setting[e] = s, i.$message.success("字体加载成功"), i.$parent.draw()
                        }, n.readAsDataURL(t)
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
            g = {
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
        var p = i("VU/8")(d, g, !1, function(t) {
            i("SmEV")
        }, null, null);
        e.a = p.exports
    }
});