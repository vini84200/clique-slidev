import { TemplateAPI, Node } from "@livereader/graphly-d3";
const Circle = {
    shapeSize: 300,
    shapeBuilder: shapeBuilder,
};
function shapeBuilder(data: Node) {
    const shape = TemplateAPI.Shape.Circle(150);
    shape.classed("gly_teal_fill", true);
    shape.classed("gly-selectable", true);
    return shape;
}
export default Circle; 