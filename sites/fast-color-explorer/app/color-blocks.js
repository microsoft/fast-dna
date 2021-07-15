import {
    Background,
    Button,
    ButtonAppearance,
    Caption,
    Checkbox,
    Divider,
    Hypertext,
    Label,
    Paragraph,
    TextField,
} from "@microsoft/fast-components-react-msft";
import React from "react";
import manageJss from "@microsoft/fast-jss-manager-react";
import classnames from "classnames";
import { get, isEqual, uniqueId } from "lodash-es";
import { connect } from "react-redux";
import { StealthIcon } from "./icons";
import {
    accentFillActive,
    accentFillHover,
    accentFillRest,
    accentForegroundActive,
    accentForegroundHover,
    accentForegroundRest,
    backgroundColor,
    focusStrokeInner,
    focusStrokeOuter,
    foregroundOnAccent,
    neutralFillActive,
    neutralFillHover,
    neutralFillInputRest,
    neutralFillRest,
    neutralFillStealthActive,
    neutralFillStealthHover,
    neutralFillStealthRest,
    neutralFillStrongActive,
    neutralFillStrongHover,
    neutralFillStrongRest,
    neutralForegroundHint,
    neutralForegroundRest,
    neutralStrokeActive,
    neutralStrokeDividerRest,
    neutralStrokeHover,
    neutralStrokeRest,
} from "./recipes";
import { ComponentTypes } from "./state";
import { Swatch, SwatchTypes } from "./swatch";
const styles = {
    colorBlocks: {
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        alignItems: "stretch",
        textAlign: "center",
        color: neutralForegroundRest,
        position: "relative",
        transition: "opacity .1s linear",
        height: "100%",
    },
    colorBlocks_title: {
        margin: "16px auto 4px",
        fontWeight: "600",
        height: "34px",
    },
    colorBlocks_content: {
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 48px 36px",
    },
    colorBlocks_example: {
        height: "60px",
        display: "flex",
        alignItems: "center",
        marginTop: "24px",
    },
};
function NeutralFillSwatch(props) {
    return (
        <Swatch
            {...props}
            type={SwatchTypes.fill}
            foregroundRecipe={neutralForegroundRest}
        />
    );
}
function AccentFillSwatch(props) {
    return (
        <Swatch
            {...props}
            type={SwatchTypes.fill}
            foregroundRecipe={foregroundOnAccent}
        />
    );
}
function FocusSwatch(props) {
    return (
        <Swatch
            {...props}
            type={SwatchTypes.outline}
            fillRecipe={backgroundColor}
            foregroundRecipe={focusStrokeOuter}
            outlineRecipe={focusStrokeOuter}
            recipeName="focusStrokeOuter"
        />
    );
}
class ColorBlocksBase extends React.Component {
    constructor(props) {
        super(props);
        this.titleStyleOverrides = {
            caption: {
                margin: "20px 0 12px",
                color: neutralForegroundRest,
            },
        };
        this.neutralTextStyleOverrides = {
            paragraph: {},
        };
        this.hintTextStyleOverrides = {
            caption: {
                color: neutralForegroundHint,
            },
        };
        this.dividerStyleOverrides = {
            divider: {
                width: "150px",
            },
        };
        this.state = {
            designSystem: Object.assign({}, props.designSystem, {
                backgroundColor: props.backgroundColor,
            }),
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (
            props.backgroundColor !== undefined || // TODO: fix this - was state.backgroundColor but that is always undefined
            props.designSystem !== state.designSystem
        ) {
            return {
                designSystem: Object.assign({}, props.designSystem, {
                    backgroundColor: props.backgroundColor,
                }),
            };
        }
        return null;
    }
    render() {
        return (
            <Background
                value={this.state.designSystem.backgroundColor}
                className={this.generateClassName()}
                id={`${this.state.designSystem.backgroundColor
                    .toUpperCase()
                    .replace("#", "")}`}
            >
                <Caption
                    className={this.props.managedClasses.colorBlocks_title}
                    jssStyleSheet={{ caption: { color: neutralForegroundHint } }}
                >
                    BACKGROUND {this.props.index} -{" "}
                    {this.state.designSystem.backgroundColor.toUpperCase()}
                    {this.props.title ? <br /> : null}
                    {this.props.title ? (
                        <code style={{ fontWeight: "normal" }}>{this.props.title}</code>
                    ) : null}
                </Caption>

                <div className={this.props.managedClasses.colorBlocks_content}>
                    {this.renderComponent()}
                </div>
            </Background>
        );
    }
    shouldComponentUpdate(props, state) {
        return !isEqual(props, this.props);
    }
    generateClassName() {
        return classnames(this.props.managedClasses.colorBlocks);
    }
    renderExample(child) {
        return (
            <div className={get(this.props.managedClasses, "colorBlocks_example")}>
                {child}
            </div>
        );
    }
    renderComponent() {
        switch (this.props.component) {
            case ComponentTypes.backplate:
                return this.renderBackplateComponents();
            case ComponentTypes.text:
                return this.renderTextComponents();
            case ComponentTypes.form:
                return this.renderFormComponents();
        }
    }
    renderBackplateComponents() {
        return (
            <React.Fragment>
                {this.renderExample(
                    <Button appearance={ButtonAppearance.primary}>Accent</Button>
                )}

                <AccentFillSwatch
                    fillRecipe={accentFillRest}
                    recipeName="accentFillRest"
                />
                <AccentFillSwatch
                    fillRecipe={accentFillHover}
                    recipeName="accentFillHover"
                />
                <AccentFillSwatch
                    fillRecipe={accentFillActive}
                    recipeName="accentFillActive"
                />
                <Swatch
                    type={SwatchTypes.foreground}
                    fillRecipe={accentFillRest}
                    foregroundRecipe={foregroundOnAccent}
                    recipeName="foregroundOnAccent"
                />
                <Swatch
                    type={SwatchTypes.outline}
                    fillRecipe={focusStrokeOuter}
                    foregroundRecipe={focusStrokeInner}
                    outlineRecipe={focusStrokeInner}
                    recipeName="focusStrokeInner"
                />
                <FocusSwatch />

                {this.renderExample(<Button>Neutral</Button>)}
                <NeutralFillSwatch
                    fillRecipe={neutralFillRest}
                    recipeName="neutralFillRest"
                />
                <NeutralFillSwatch
                    fillRecipe={neutralFillHover}
                    recipeName="neutralFillHover"
                />
                <NeutralFillSwatch
                    fillRecipe={neutralFillActive}
                    recipeName="neutralFillActive"
                />
                <Swatch
                    type={SwatchTypes.foreground}
                    fillRecipe={backgroundColor}
                    foregroundRecipe={neutralForegroundRest}
                    recipeName="neutralForegroundRest"
                />
                <FocusSwatch />

                {this.renderExample(
                    <Button appearance={ButtonAppearance.outline}>Outline</Button>
                )}
                <NeutralFillSwatch
                    fillRecipe={neutralFillStealthRest}
                    recipeName="neutralFillStealthRest"
                />
                <NeutralFillSwatch
                    fillRecipe={neutralFillStealthHover}
                    recipeName="neutralFillStealthHover"
                />
                <NeutralFillSwatch
                    fillRecipe={neutralFillStealthActive}
                    recipeName="neutralFillStealthActive"
                />
                <Swatch
                    type={SwatchTypes.outline}
                    fillRecipe={backgroundColor}
                    foregroundRecipe={neutralForegroundRest}
                    outlineRecipe={neutralStrokeRest}
                    recipeName="neutralStrokeRest"
                />
                <Swatch
                    type={SwatchTypes.outline}
                    fillRecipe={backgroundColor}
                    foregroundRecipe={neutralForegroundRest}
                    outlineRecipe={neutralStrokeHover}
                    recipeName="neutralStrokeHover"
                />
                <Swatch
                    type={SwatchTypes.outline}
                    fillRecipe={backgroundColor}
                    foregroundRecipe={neutralForegroundRest}
                    outlineRecipe={neutralStrokeActive}
                    recipeName="neutralStrokeActive"
                />
                <Swatch
                    type={SwatchTypes.foreground}
                    fillRecipe={backgroundColor}
                    foregroundRecipe={neutralForegroundRest}
                    recipeName="neutralForegroundRest"
                />
                <FocusSwatch />

                {this.renderExample(
                    <Button
                        appearance={ButtonAppearance.stealth}
                        beforeContent={StealthIcon}
                    >
                        Stealth
                    </Button>
                )}

                <NeutralFillSwatch
                    fillRecipe={neutralFillStealthRest}
                    recipeName="neutralFillStealthRest"
                />
                <NeutralFillSwatch
                    fillRecipe={neutralFillStealthHover}
                    recipeName="neutralFillStealthHover"
                />
                <NeutralFillSwatch
                    fillRecipe={neutralFillStealthActive}
                    recipeName="neutralFillStealthActive"
                />
                <Swatch
                    type={SwatchTypes.foreground}
                    fillRecipe={backgroundColor}
                    foregroundRecipe={neutralForegroundRest}
                    recipeName="neutralForegroundRest"
                />
                <FocusSwatch />
            </React.Fragment>
        );
    }
    renderTextComponents() {
        return (
            <React.Fragment>
                {this.renderExample(
                    <Paragraph jssStyleSheet={this.neutralTextStyleOverrides}>
                        Neutral
                    </Paragraph>
                )}
                <Swatch
                    type={SwatchTypes.foreground}
                    fillRecipe={backgroundColor}
                    foregroundRecipe={neutralForegroundRest}
                    recipeName="neutralForegroundRest"
                />

                {this.renderExample(
                    <Caption jssStyleSheet={this.hintTextStyleOverrides}>Hint</Caption>
                )}
                <Swatch
                    type={SwatchTypes.foreground}
                    fillRecipe={backgroundColor}
                    foregroundRecipe={neutralForegroundHint}
                    recipeName="neutralForegroundHint"
                />

                {this.renderExample(<Hypertext href={"#"}>Accent</Hypertext>)}

                <Swatch
                    type={SwatchTypes.foreground}
                    fillRecipe={backgroundColor}
                    foregroundRecipe={accentForegroundRest}
                    recipeName="accentForegroundRest"
                />
                <Swatch
                    type={SwatchTypes.foreground}
                    fillRecipe={backgroundColor}
                    foregroundRecipe={accentForegroundHover}
                    recipeName="accentForegroundHover"
                />
                <Swatch
                    type={SwatchTypes.foreground}
                    fillRecipe={backgroundColor}
                    foregroundRecipe={accentForegroundActive}
                    recipeName="accentForegroundActive"
                />
                <FocusSwatch />
            </React.Fragment>
        );
    }
    renderFormComponents() {
        const checkboxId = uniqueId();
        return (
            <React.Fragment>
                {this.renderExample(<TextField placeholder="jerry@microsoft.com" />)}
                <Swatch
                    type={SwatchTypes.fill}
                    fillRecipe={neutralFillInputRest}
                    recipeName="neutralFillInputRest"
                    foregroundRecipe={neutralForegroundRest}
                />
                <Swatch
                    type={SwatchTypes.foreground}
                    fillRecipe={neutralFillInputRest}
                    foregroundRecipe={neutralForegroundHint}
                    recipeName="neutralForegroundHint"
                />
                <Swatch
                    type={SwatchTypes.foreground}
                    fillRecipe={neutralFillInputRest}
                    foregroundRecipe={neutralForegroundRest}
                    recipeName="neutralForegroundRest"
                />
                <Swatch
                    type={SwatchTypes.outline}
                    fillRecipe={backgroundColor}
                    foregroundRecipe={neutralForegroundRest}
                    outlineRecipe={neutralStrokeRest}
                    recipeName="neutralStrokeRest"
                />
                <Swatch
                    type={SwatchTypes.outline}
                    fillRecipe={backgroundColor}
                    foregroundRecipe={neutralForegroundRest}
                    outlineRecipe={neutralStrokeHover}
                    recipeName="neutralStrokeHover"
                />
                <FocusSwatch />
                {this.renderExample(
                    <Checkbox inputId={checkboxId}>
                        <Label slot="label" htmlFor={checkboxId}>
                            Checkbox
                        </Label>
                    </Checkbox>
                )}
                <Swatch
                    type={SwatchTypes.fill}
                    fillRecipe={neutralFillInputRest}
                    recipeName="neutralFillInputRest"
                    foregroundRecipe={neutralForegroundRest}
                />
                <Swatch
                    type={SwatchTypes.fill}
                    fillRecipe={neutralFillStrongRest}
                    recipeName="neutralFillStrongRest"
                    foregroundRecipe={neutralForegroundRest}
                />
                <Swatch
                    type={SwatchTypes.fill}
                    fillRecipe={neutralFillStrongHover}
                    recipeName="neutralFillStrongHover"
                    foregroundRecipe={neutralForegroundRest}
                />
                <Swatch
                    type={SwatchTypes.fill}
                    fillRecipe={neutralFillStrongActive}
                    recipeName="neutralFillStrongActive"
                    foregroundRecipe={neutralForegroundRest}
                />
                <Swatch
                    type={SwatchTypes.foreground}
                    fillRecipe={neutralFillInputRest}
                    foregroundRecipe={neutralForegroundRest}
                    recipeName="neutralForegroundRest"
                />
                <FocusSwatch />
                {this.renderExample(
                    <Divider jssStyleSheet={this.dividerStyleOverrides} />
                )}
                <Swatch
                    type={SwatchTypes.outline}
                    fillRecipe={backgroundColor}
                    foregroundRecipe={neutralForegroundRest}
                    outlineRecipe={neutralStrokeDividerRest}
                    recipeName="neutralStrokeDividerRest"
                />
            </React.Fragment>
        );
    }
}
function mapStateToProps(state) {
    return {
        component: state.componentType,
        designSystem: state.designSystem,
    };
}
export default manageJss(styles)(connect(mapStateToProps)(ColorBlocksBase));
