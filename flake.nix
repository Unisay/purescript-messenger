{
  description = "Purescript flake";

  inputs = {
    flake-compat.flake = false;
    flake-compat.url = github:edolstra/flake-compat;
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "nixpkgs/nixos-unstable";
    # zephyr.flake = false;
    # zephyr.url = "https://github.com/MaybeJustJames/zephyr/releases/download/c074270/Linux.tar.gz";
  };

  outputs = { self, nixpkgs, flake-compat, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShell =
          pkgs.mkShell {
            buildInputs = with pkgs; [
              dhall
              nixpkgs-fmt
              nodejs-16_x
              purescript
              spago
              nixpkgs-fmt
            ];
            shellHook = ''
              export LC_ALL=C
              export PATH=$PATH
            '';
          };
      });
}
