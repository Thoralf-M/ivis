function WebglCircle(r, o, e=.5, t=parseInt("000000", 16)) {
    this.size = r,
    this.color = o,
    this.border_size = e,
    this.border_color = t,
    this.confirmed = !1,
    this.tip = !0
}
function buildCircleNodeShader() {
    var r, o, e, t, i, c, a, l, n = ["precision mediump float;", "varying vec4 color;", "varying vec4 border_color;", "varying float border_size;", "void main(void) {", "   if ((gl_PointCoord.x - 0.5) * (gl_PointCoord.x - 0.5) + (gl_PointCoord.y - 0.5) * (gl_PointCoord.y - 0.5) < 0.25 - border_size) {", "     gl_FragColor = color;", "   } else if ((gl_PointCoord.x - 0.5) * (gl_PointCoord.x - 0.5) + (gl_PointCoord.y - 0.5) * (gl_PointCoord.y - 0.5) < 0.25) {", "     gl_FragColor = border_color;", "   } else {", "     gl_FragColor = vec4(0);", "   }", "}"].join("\n"), s = ["attribute vec2 a_vertexPos;", "attribute vec4 a_customAttributes;", "uniform vec2 u_screenSize;", "uniform mat4 u_transform;", "varying vec4 color;", "varying vec4 border_color;", "varying float border_size;", "void main(void) {", "   gl_Position = u_transform * vec4(a_vertexPos/u_screenSize, 0, 1);", "   gl_PointSize = a_customAttributes[1] * u_transform[0][0];", "   float c = a_customAttributes[0];", "   color.b = mod(c, 256.0); c = floor(c/256.0);", "   color.g = mod(c, 256.0); c = floor(c/256.0);", "   color.r = mod(c, 256.0); c = floor(c/256.0); color /= 255.0;", "   color.a = 1.0;", "   float bc = a_customAttributes[3];", "   border_color.b = mod(bc, 256.0); bc = floor(bc/256.0);", "   border_color.g = mod(bc, 256.0); bc = floor(bc/256.0);", "   border_color.r = mod(bc, 256.0); bc = floor(bc/256.0); border_color /= 255.0;", "   border_color.a = 1.0;", "   border_size = a_customAttributes[2]/4.0;", "}"].join("\n"), b = new Float32Array(64), _ = 0;
    return {
        load: function(i) {
            o = i,
            webglUtils = Viva.Graph.webgl(i),
            r = webglUtils.createProgram(s, n),
            o.useProgram(r),
            t = webglUtils.getLocations(r, ["a_vertexPos", "a_customAttributes", "u_screenSize", "u_transform"]),
            o.enableVertexAttribArray(t.vertexPos),
            o.enableVertexAttribArray(t.customAttributes),
            e = o.createBuffer()
        },
        position: function(r, o) {
            var e = r.id;
            b[6 * e] = o.x,
            b[6 * e + 1] = -o.y,
            b[6 * e + 2] = r.color,
            b[6 * e + 3] = r.size,
            b[6 * e + 4] = r.border_size,
            b[6 * e + 5] = r.border_color
        },
        render: function() {
            o.useProgram(r),
            o.bindBuffer(o.ARRAY_BUFFER, e),
            o.bufferData(o.ARRAY_BUFFER, b, o.DYNAMIC_DRAW),
            l && (l = !1,
            o.uniformMatrix4fv(t.transform, !1, a),
            o.uniform2f(t.screenSize, i, c)),
            o.vertexAttribPointer(t.vertexPos, 2, o.FLOAT, !1, 6 * Float32Array.BYTES_PER_ELEMENT, 0),
            o.vertexAttribPointer(t.customAttributes, 4, o.FLOAT, !1, 6 * Float32Array.BYTES_PER_ELEMENT, 8),
            o.drawArrays(o.POINTS, 0, _)
        },
        updateTransform: function(r) {
            a = r,
            l = !0
        },
        updateSize: function(r, o) {
            i = r,
            c = o,
            l = !0
        },
        createNode: function(r) {
            b = webglUtils.extendArray(b, _, 6),
            _ += 1
        },
        removeNode: function(r) {
            _ > 0 && (_ -= 1),
            r.id < _ && _ > 0 && webglUtils.copyArrayPart(b, 6 * r.id, 6 * _, 6)
        },
        replaceProperties: function(r, o) {}
    }
}
