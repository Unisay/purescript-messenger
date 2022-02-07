{ sources ? import ./nix/sources.nix }:
let
  pkgs = import sources.nixpkgs { overlays = [ ]; config = { }; };
  pursPkgs = import sources.easy-purescript-nix { inherit pkgs; };
in
pkgs.stdenv.mkDerivation {
  name = "purescript-messenger";
  buildInputs = with pursPkgs; [
    pkgs.dhall
    pkgs.httpie
    pkgs.nixpkgs-fmt
    pkgs.nodejs-16_x
    pursPkgs.purs
    pursPkgs.spago
    pursPkgs.zephyr
    pursPkgs.purs-tidy
  ];
}
