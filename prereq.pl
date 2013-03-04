#!/usr/bin/perl
use strict;
use warnings;

use Term::ANSIColor qw(:constants);
$Term::ANSIColor::AUTORESET = 1;

$| = 1;

my %PREREQ;
my $result;
my $error;

#------------------------EDIT HERE-------------------------#
$PREREQ{'node.js'} = 'node';
$PREREQ{'npm'} = 'npm';
#------------------------STOP HERE-------------------------#

if (!&check_prereq(\%PREREQ)) {
    print BOLD YELLOW "\n  At least one prerequisite was not met. Please check your setup.\n";
    exit;
}


sub check_prereq
{
    my $prereq = shift;

    foreach (keys %{$prereq}) {
        print BOLD WHITE " :: " . $_ . "...";
        $result = `$prereq->{$_} --version &> /dev/null`;

        if (${^CHILD_ERROR_NATIVE} ne 0) {
            print BOLD RED "not found!\n";
            $error = 1;
        } else {
            print BOLD GREEN "found!\n";
        }
    }

    if ($error) {
        return undef;
        print BOLD YELLOW "  At least one prerequisite was not met. Please check your setup.\n";
    } else {
        return 1;
    }
}

