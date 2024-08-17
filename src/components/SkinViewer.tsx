import { useEffect, useRef } from "react";
import { SkinViewer } from "skinview3d";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "./SkinViewer.css";
import { Camera } from "three";

interface Props {
  uuid?: string;
  width: number;
  height: number;
}

const MinecraftSkinViewer = ({ uuid, width = 50, height = 50 }: Props) => {
  const viewerRef = useRef<HTMLCanvasElement | null>(null);
  const skinViewerRef = useRef<SkinViewer | null>(null);

  useEffect(() => {
    if (viewerRef.current) {
      const skinViewer = new SkinViewer({
        canvas: viewerRef.current,
        width,
        height,
        skin: `https://crafatar.com/skins/${uuid}`,
      });

      const camera = skinViewer.camera as unknown as Camera;

      const controls = new OrbitControls(
        camera,
        skinViewer.renderer.domElement
      );
      controls.enableRotate = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 3;

      const randomAngle = Math.random() * 2 * Math.PI;
      skinViewer.camera.rotation.y = randomAngle;

      const animate = () => {
        controls.update();
        skinViewer.render();
        requestAnimationFrame(animate);
      };
      animate();

      skinViewerRef.current = skinViewer;

      return () => {
        controls.dispose();
        skinViewer.dispose();
      };
    }
  }, [uuid, width, height]);

  return <canvas ref={viewerRef} className="skin-viewer-canvas" />;
};

export default MinecraftSkinViewer;
