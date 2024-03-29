{
  description = "Purescript flake";

  inputs = {
    flake-compat.flake = false;
    flake-compat.url = github:edolstra/flake-compat;
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "nixpkgs/nixos-unstable";
    easy-purescript-nix = {
      url = "github:Unisay/easy-purescript-nix";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, flake-utils, flake-compat, easy-purescript-nix }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        epkgs = import easy-purescript-nix { inherit pkgs; };
      in
      {
        devShell =
          pkgs.mkShell {
            buildInputs = [
              pkgs.dhall
              pkgs.nixfmt
              pkgs.nodejs-16_x
              pkgs.sqlite
              pkgs.purescript
              epkgs.purs-tidy
              epkgs.spago
              epkgs.zephyr
            ];
          };
      });
}

